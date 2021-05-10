const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const transformDate = (time) => {
  let dd = String(time.getDate()).padStart(2, '0');
  let mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = time.getFullYear();
  let date = yyyy + '-' + mm + '-' + dd;
  return date;
};

module.exports = (app) => {
  // get all posts
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // get all posts from a specific user
  app.get('/api/user/posts', async (req, res) => {
    try {
      const posts = await Post.find({ _user: req.user.id });
      res.send(posts);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // get post information given postId
  app.get('/api/user/posts/:postId', async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.postId });
      res.send(post);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // create post
  app.post('/api/user/posts/new', async (req, res) => {
    const { title, image, comment, instruction } = req.body;
    console.log(req.user.name);
    const post = new Post({
      title,
      image,
      comment,
      instruction,
      _user: req.user.id,
      createDate: Date.now(),
      lastEdit: transformDate(new Date()),
      createdBy: req.user.name,
      image:
        'https://images.unsplash.com/photo-1594487984147-3389bcee5078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
    });

    try {
      await post.save();
      console.log(`Post is create!`);
      res.json({ message: `Post has been successfully created!` });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // delete the post given the postId within the URL
  app.delete('/api/user/posts/:postId', async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.postId });
      console.log(`${req.params.postId} has been deleted`);
      res.json({ message: 'Post has been successfully removed!' });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // update the post
  app.post('/api/user/posts/:postId', async (req, res) => {
    const { title, instruction, comment } = req.body;
    const lastEdit = transformDate(new Date());
    console.log('in put ');
    try {
      await Post.findByIdAndUpdate(req.params.postId, {
        title,
        instruction,
        comment,
        lastEdit,
      });
      console.log(`${req.params.postId} has been updated`);
      res.json({ message: 'Post has been successfully updated!' });
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
