const express = require('express');
const axios = require('axios');

const app = express();

const port = 5000;

async function grabTenCocktails() {
  cucktails = [];
  let i = 0;
  for (i = 0; i < 10; ++i) {
    const randomCocktail = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    cucktails.push(randomCocktail.data);
    console.log(randomCocktail.data);
  }
  return cucktails;
}

//grabTenCocktails();
module.exports = (app) => {
  app.get('/', async (req, res) => {
    try {
      const randomCocktail = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      );
      res.send(randomCocktail.data);
      console.log(randomCocktail.data);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  //   app.listen(5000, () => {
  //     console.log(`listening on port: ${port}`);
  //   });
};
