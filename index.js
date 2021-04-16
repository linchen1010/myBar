const express = require('express');
const fs = require("fs");
const axios = require('axios');
const app = express();

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});


const cocktail = require('./routes/cocktailRoutes');
const ingredient = require('./routes/ingredientRoutes');
const home = require('./routes/home');
require('./routes/cocktailTest')(app);

app.use('/', home);
app.use('/cocktails', cocktail);
app.use('/ingredients', ingredient);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} ...`);
});