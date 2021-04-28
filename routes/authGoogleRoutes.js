const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ userId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        userId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      }).save();
      done(null, user);
    }
  )
);

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/drinks');
    }
  );

  app.get('api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('api/current_user', (req, res) => {
    res.send(req.user);
  });
};
