import mongoose from 'mongoose';
import {dbPromise} from './database.js';

var userSchema = new mongoose.Schema({
  //setando formas de validacao do input para previnir dados sujos no db
  name: {
    type: String,
    required: [true, 'nao pode ser vazio'],
    index: true,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);
//registrando scheman com mongoose
export default User;
