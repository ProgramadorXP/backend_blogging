import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

//Charge .env file
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST, // Change if the database is on a different host
  port: parseInt(process.env.DB_PORT as string), // Change if the database is on a different port
  dialect: 'postgres', // Change if the database is using a different dialect
  username: process.env.DB_USER, // Change if the database is using a different username
  password: process.env.DB_PASSWORD, // Change if the database is using a different password
  database: process.env.DB_NAME, // Change if the database is using a different name
});

export default sequelize;
