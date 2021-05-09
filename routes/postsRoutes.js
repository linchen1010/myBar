const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const Post = mongoose.model('Post');

const transformDate = (time) => {
  let dd = String(time.getDate()).padStart(2, '0');
  let mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = time.getFullYear();
  let date = yyyy + '-' + mm + '-' + dd;
  return date;
};

module.exports = (app) => {
  // get all posts from the specific user
  app.get('/api/user/posts', async (req, res) => {
    try {
      const posts = await Post.find({ _user: req.user.id });
      // console.log(posts);
      res.send(posts);
      // res.send('hello');
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get('/api/user/posts/:id', async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      console.log(post);
      res.send(post);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // create post
  app.post('/api/user/posts/new', async (req, res) => {
    const { title, image, comment, instruction } = req.body;
    const post = new Post({
      title,
      image,
      comment,
      instruction,
      _user: req.user.id,
      createDate: Date.now(),
      lastEdit: transformDate(new Date()),
    });

    try {
      await post.save();
      console.log(`Post is create!`);
      res.json({ message: 'Post has been successfully created!' });
      // const user = await req.user.save();
      // res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
