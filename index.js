const express = require('express');

const app = express();

require('./routes/cucktailRoutes')(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} ...`);
});
