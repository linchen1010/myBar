if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
// const users = []
const mongoose = require('mongoose');
const User = mongoose.model('users');

const initializePassport = require('./passport-config');
const authGoogleRoutes = require('./authGoogleRoutes');

initializePassport(
    passport,
    async email => await User.find({ email: email }),
    async id => await User.find({ id: id })
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
    req.send("ok");
})


router.get('/signup', (req, res) => {

});


router.post('/signup', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.send(user)
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(req.body.username)
        user = new User({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save();
        let email = await User.find({ email: req.body.email });
        console.log(email[0].email)
        res.send(null);
    }

});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    window.location = '/login';
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req);
        res.status(303).send("already exist");
    }
    next()
}



module.exports = router;