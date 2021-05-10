const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');

require('./models/User');
require('./models/Post');

mongoose.connect(keys.mongoURI, {
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

app.use(express.json()); // to support JSON-encoded bodies
app.use(
  express.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

const cocktail = require('./routes/cocktailRoutes');
const ingredient = require('./routes/ingredientRoutes');
const authsRoutes = require('./routes/authsRoutes');
const userProfile = require('./routes/userProfileRoutes');
require('./routes/authGoogleRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/postsRoutes')(app);

app.use('/api', cocktail);
app.use('/api', ingredient);
app.use('/api', authsRoutes);
app.use('/api', userProfile);

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} ...`);
});
