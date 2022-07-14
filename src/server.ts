import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import { UserController } from './domain/controllers/userController'

const app = express();

const ModuleUserController = new UserController();

app.get('/', async (req, res) => {
  const response = await ModuleUserController.create({
    email: 'jairo@mail1.com', 
    name: 'jairo',
    password: 'jairo123'
  })

  return res.json({ ...response });
})


mongoose.connect('mongodb://jairo:jairosl@localhost:27017/admin', () => {
  console.log('connect to database')
  app.listen(3333, () => {
    console.log('start server')
  })
})


