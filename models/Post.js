const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  image: String,
  comment: String,
  instruction: String,
  createDate: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  like: { type: Number, default: 0 },
});

mongoose.model('posts'.postSchema);
