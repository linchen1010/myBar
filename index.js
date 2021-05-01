const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');


require('./models/User');
mongoose.connect(keys.mongoURI3, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});



// app.all('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
// });

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, (ms)
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const cocktail = require('./routes/cocktailRoutes');
const ingredient = require('./routes/ingredientRoutes');
const authsRoutes = require('./routes/authsRoutes');
// const Login = require('./routes/Login');
require('./routes/authGoogleRoutes')(app);

app.use('/api', cocktail);
app.use('/api', ingredient);
app.use('/api', authsRoutes);
// app.use('/api', Login);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} ...`);
});