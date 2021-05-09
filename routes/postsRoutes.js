const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const Post = mongoose.model('posts');

// title: String,
//   image: String,
//   comment: String,
//   instruction: String,
//   createDate: Date,
//   _user: { type: Schema.Types.ObjectId, ref: 'User' },
//   like: { type: Number, default: 0 },

module.exports = (app) => {
  app.get('/api/user/:id/posts', async (req, res) => {
    const posts = await Post.findAll({});
  });

  app.get('/api/user/posts/new'), async (req, res) => {
      const { title, image, comment, instruction } = req.body;
      const post = new Post({
          title,
          image,
          comment,
          instruction,
          _user = req.user.id,
          createDate: Date.now()
      });
      
      try {
          await post.save();
          const user = await req.user.save();
          res.send(user);
      } catch(err) {
        res.status(422).send(err);
      }
  }
};
