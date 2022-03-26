const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  cors: process.env.CORS,
  dbHost: process.env.DB_HOST_MONGO,
  dbName: process.env.DB_NAME_MONGO,
  dbUser: process.env.DB_USER_MONGO,
  dbPassword: process.env.DB_PASSWORD_MONGO,
  jwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = config;
