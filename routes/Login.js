if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const User = require('../models/User');

const initializePassport = require('./passport-config');

initializePassport( async () => {
    passport,
    email => await User.find(user => user.email === email),
    id => await User.find(user => user.id === id)
}
)

router.use(express.urlencoded({ extended: true }))
router.use(express.json())
router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get('/login', (req, res) => {
    res.send("ok");
})

module.exports = router;