# Step 1
FROM node:18-alpine as builder

WORKDIR /src
# COPY package.json ./
COPY . .
# install les dependances
RUN  npm install
# faire le build
RUN npm run build

#step2 deployment

FROM node:18-alpine
WORKDIR /src

COPY  --from=builder  /src/dist ./dist
COPY  --from=builder  /src/package.json ./
RUN  npm install --omit=dev

# Utiliser une variable d'environnement
ARG mode
ENV MODE=$mode

ARG mongodb_url
ENV MONGODB_URL=$mongodb_url


# exposition de port
EXPOSE 8000:8000

# execution de l application
CMD [ "node","dist/main.js" ]