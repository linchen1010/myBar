const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  image: String,
  comment: String,
  instruction: String,
  createDate: Date,
  lastEdit: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  like: { type: Number, default: 0 },
  createdBy: String,
});

mongoose.model('Post', postSchema);
