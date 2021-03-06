// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = require('../config/keys');

const initializePassport = require('../services/passport-config');

initializePassport(passport, (id) => User.find({ id: id }).id);

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(flash());
router.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.post(
  '/login',
  checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/failureLogin',
    failureFlash: true,
  })
);

router.get('/failureLogin', (req, res) => {
  res.json({ message: req.flash('error') });
});

router.post('/signup', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (user) {
    return res.json({ message: 'This email has been used!' });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.username);
    user = new User({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      avatar:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
    });
    await user.save();
    res.send(null);
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

async function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('already login');
    return res.send('already login');
  }
  next();
}

module.exports = router;
