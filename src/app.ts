import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import sequelize from './config/db';
import { corsConfig } from './config/cors';

dotenv.config();

const app = express();
app.use(cors(corsConfig));

//MIDDLEWARES
// Middleware to process JSON request bodies
app.use(express.json());
// Middleware to process urlencoded request bodies
app.use(express.urlencoded({ extended: true })); 

//ROUTES
app.use('/api', userRoutes);

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conection to database established successfully');
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Database connection error:', error);
  }
});
