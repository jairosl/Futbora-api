import express from 'express';
import 'express-async-errors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


import { UserController } from './domain/controllers/userController'
import { LoginController } from './domain/controllers/loginController'
import { errorHandler } from './infra/http/errorHandler';

const ModuleUserController = new UserController();
const ModuleSessionController = new LoginController();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.post('/users', async (req, res) => {
  
  const response = await ModuleUserController.create({
    email: req.body.email, 
    name: req.body.name,
    password: req.body.password,
  })

  return res.json(response);
})

app.post('/session', async (req, res) => {
  const response = await ModuleSessionController.create({
    email: req.body.email,
    password: req.body.password,
  })

  res.json(response);
})

app.use(errorHandler);

const port = process.env.PORT || 3333

mongoose.connect(process.env.MONGO_URL, () => {
  console.log('connect to database')
  app.listen(port, () => {
    console.log('start server')
  })
})


