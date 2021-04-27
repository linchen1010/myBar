const express = require('express');
const app = express();
const router = express.Router()
const bcrypt = require('bcrypt');


const users = []

router.use(express.urlencoded({ extended: false }))


router.get('/login', (req, res) => {

});

router.get('/users', (req, res) => {

})

router.get('/register', (req, res) => {
    res.send("hello")
})


router.post('/register', async (req, res) => {
    try {
        const hashedPassward = await bcrypt.hash(req.body.passward, 10);
        users.push({
            id: Data.now().toString(),
            name: req.body.name,
            email: req.body.email,
            passward: hashedPassward
        })
        res.redirect('/login');
    } catch {
        res.redirect('/resister');
    }

    console.log(users);

});

module.exports = router;