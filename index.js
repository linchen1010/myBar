const express = require('express');
const fs = require("fs");
const axios = require('axios');
const app = express();

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});


require('./routes/cocktailRoutes')(app);
require('./routes/ingredientRoutes')(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} ...`);
});
