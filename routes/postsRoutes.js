const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const Multer = require('multer');
const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });
const AWS = require('aws-sdk');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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

  // create post, integrate AWS S3 to store user's uploaded image
  app.post('/api/user/posts/new', upload.single('file'), async (req, res) => {
    const { title, image, comment, instruction } = req.body;
    const { file } = req;
    console.log(req.file);
    console.log(req.user.name);

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Access key ID
      secretAccesskey: process.env.AWS_SECRET_ACCESS_KEY, // Secret access key
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3();

    const params = {
      ACL: 'public-read',
      Bucket: 'mybardb',
      Key: file.originalname, // File name you want to save as in S3
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // // Uploading files to the bucket

    s3.upload(params, async function (err, data) {
      if (err) {
        throw err;
      }
      const post = new Post({
        title,
        image,
        comment,
        instruction,
        _user: req.user.id,
        createDate: Date.now(),
        lastEdit: transformDate(new Date()),
        createdBy: req.user.name,
        image: data.Location,
      });

      try {
        await post.save();
        console.log(`Post is create!`);
        res.json({ message: `Post has been successfully created!` });
      } catch (err) {
        res.status(422).send(err);
      }
    });
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
