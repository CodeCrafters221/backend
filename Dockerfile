FROM alpine:latest as main_gateway
WORKDIR /backend
RUN apk --no-cache add git \
    && git clone https://github.com/papabaab/codecrafters-ai-assistant.git
RUN apk add --update nodejs npm
RUN cd codecrafters-ai-assistant && npm install && npm run build


# Step 1
FROM node:22-alpine as builder
WORKDIR /src
# COPY package.json ./
COPY . .
# install les dependances
RUN  npm install
# faire le build
RUN npm run build

#step2 deployment

FROM node:22-alpine
WORKDIR /src

COPY  --from=builder  /src/dist ./api/dist
COPY  --from=builder  /src/package.json ./api

COPY  --from=main_gateway  /backend/codecrafters-ai-assistant/dist ./ai/dist
COPY  --from=main_gateway  /backend/codecrafters-ai-assistant/package.json ./ai

WORKDIR /src/api
RUN npm install --omit=dev
WORKDIR /src/ai
RUN npm install --omit=dev

# Utiliser une variable d'environnement
ARG mode
ENV MODE=$mode

ARG mongodb_url
ENV MONGODB_URL=$mongodb_url


# exposition de port
EXPOSE 8000:8000
EXPOSE 3003:3003
EXPOSE 3001:3001

# lancement de l application
WORKDIR /src
# CMD [ "node", "dist/main.js" ]
COPY ./start_services.sh ./
# execution de l application
RUN chmod +x start_services.sh
CMD ["/bin/sh","start_services.sh"]