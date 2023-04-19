import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { errorHandler } from './api/middlewares'
import { postRoutes } from './api/routes';
import connectMongo from './config/db';
import redisClient from './config/redis';

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

const PORT = process.env.PORT;
connectMongo().then(async () => {
  app.listen(PORT)
  await redisClient.connect()
})

app.use('/api/posts/', postRoutes)
app.use('/', (req: Request, res: Response) => res.send('Welcome to crud-api'))
