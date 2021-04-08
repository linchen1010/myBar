const express = require('express');
const axios = require('axios');

const app = express();

const port = 5000;

function sanitizeCocktailDB(data) {
  cocktails = {};
  cocktails['name'] = data['strDrink'];
  cocktails['instruction'] = data['strInstructions'];
  cocktails['imageURL'] = data['strDrinkThumb'];
  cocktails['ingredient'] = [];
  cocktails['measure'] = [];
  for (let i = 0; i < 15; i++) {
    if (data[`strIngredient${i}`] != null) {
      cocktails['ingredient'].push(data[`strIngredient${i}`]);
      cocktails['measure'].push(data[`strMeasure${i}`]);
    }
  }
  return cocktails;
}

async function getTop10() {
  cocktailName = ['Old Fashioned', 'Negroni', 'Daiquiri', 'Dirty Martini', 'Margarita', 'Long Island Iced Tea', 'Whiskey Sour', 'Manhattan', 'Aperol Spritz', 'Mojito']
  tenCocktail = []
  for (let i = 0; i < cocktailName.length; i++) {
    const cocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName[i]}`
    );
    tenCocktail.push(sanitizeCocktailDB(cocktail.data['drinks'][0]));
  }
  return tenCocktail;
}

async function getRandom() {
  random = [];
  for (let i = 0; i < 6; ++i) {
    const randomCocktail = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    random.push(sanitizeCocktailDB(randomCocktail.data['drinks'][0]));
  }
  return random;
}

module.exports = (app) => {
  app.get('/random', async (req, res) => {
    try {
      random = await getRandom();
      console.log(random);
      res.send(random);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  app.get('/top10', async (req, res) => {
    try {
      tenCocktail = await getTop10()
      res.send(tenCocktail);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });


};
