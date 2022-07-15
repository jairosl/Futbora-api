import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hash_password: {
    type: String,
    unique: false,
    required: true,
  }
});

const User = mongoose.model('user', userSchema)

export { User }