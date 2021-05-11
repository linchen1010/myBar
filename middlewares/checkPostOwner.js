const mongoose = require('mongoose');
const Post = mongoose.model('Post');
module.exports = async (req, res, next) => {
  // user is login
  if (req.user) {
    const post = await Post.findById({ _id: req.params.postId });
    if (!post) return res.status(400).send({ error: 'This Post is not exist' });
    else {
      if (post._user.equals(req.user._id)) {
        next();
      } else {
        return res
          .status(401)
          .send({ error: `You dont't have permission to do this!` });
      }
    }
  }
};
