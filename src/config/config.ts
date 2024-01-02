import dotenv from 'dotenv';

dotenv.config();

export const config = {
  URL: process.env.URL || 'http://localhost',
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/database',
};
