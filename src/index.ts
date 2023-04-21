import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { errorHandler } from './api/middlewares';
import { authorRoutes, postRoutes } from './api/routes';
import connectMongo from './config/db';
import redisClient from './config/redis';

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)
app.use('/api/posts/', postRoutes)
app.use('/api/authors/', authorRoutes)
app.get('/', (req: Request, res: Response) => res.send('Welcome to crud-api'))

const PORT = process.env.PORT;
connectMongo();
redisClient.connect();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on ${PORT}`)
});

