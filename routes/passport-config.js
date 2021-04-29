
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const User = mongoose.model('users');


function initialize(passport, getUserByEmail, getUserByID) {
    
    const authenticateUser = async (email, password, done) => {
        // could figure out how to use this (thumb)
        // const user = await getUserByID(email);
        const user = await User.findOne({email: email});
        
        if (user == null) {
            console.log('No user with this email');
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('Login Success!')
                return done(null, user)
            } else {
                console.log('Password incorrect!')
                return done(null, false, { message: 'Password incorrect' })
            }

        } catch (e) {
            console.log(e);
            return done(e)
        }


    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserByID(id))
    })
}

module.exports = initialize