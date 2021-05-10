if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
// const fileUpload = require('express-fileupload');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Multer = require('multer');
const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });

// router.use(fileUpload());
// router.use(express.urlencoded({ extended: true }))

const AWS = require('aws-sdk');

router.get('/profilePic/:id', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user.avatar) {
    res.send(user.avatar);
  } else {
    // if user haven't upload avatar, default to this image url
    res.send(
      'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg'
    );
  }
});

router.post('/imageUpload/:id', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log(req.params.id);
  console.log(file);

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

    await User.updateOne({ _id: req.params.id }, { avatar: data.Location });

    res.send({
      response_code: 200,
      response_message: 'Success',
      response_data: data,
    });
  });
});

module.exports = router;
