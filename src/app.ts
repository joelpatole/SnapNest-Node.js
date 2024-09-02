import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import bodyParser from 'body-parser';
import cors from 'cors';
import json from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import postRoutes from './routes/postRoutes';
import generRoutes from './routes/generRoutes';

const app = express();

// const corsOptions = {
//   origin: 'http://127.0.0.1:5001', // Replace with the URL of your frontend application
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

// Allow all origins
app.use(cors());


//
//app.use(bodyParser.json()); and app.use(express.json()); 
// essentially do the same thing: they parse incoming requests with JSON payloads.
app.use(bodyParser.json()); //way 1
app.use(json()); //way 2 (Recommended)

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gener',generRoutes);
app.use('/api/post', postRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/users', userRoutes);

app.use(errorHandler);

const mongoURI = process.env.MONGO_URI || config.get<string>('mongoURI');
mongoose.connect(mongoURI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;