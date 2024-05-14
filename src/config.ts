export const config = () => ({
  port: process.env.PORT || 8080,
  secretKey: process.env.SECRET_KEY || 'TopSecret51@',
  mongoUri: process.env.MONGO_URi || 'mongodb://localhost:27017/ndaje-api',
});
