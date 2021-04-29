const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: String,
  name: String,
  email: String,
  password: String
});

mongoose.model('users', userSchema);
