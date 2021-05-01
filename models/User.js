const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  favoriteList: [
    {
      drinkId: String,
      drinkName: String,
      drinkImgURL: String
    }
  ]
});

mongoose.model('users', userSchema);
