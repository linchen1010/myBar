const express = require('express');
const axios = require('axios');

const app = express();

const port = 5000;



function sanitizeCocktailDB(data) {
  cucktails = {};
  cucktails['name'] = data['strDrink'];
  cucktails['instruction'] = data['strInstructions'];
  cucktails['imageURL'] = data['strDrinkThumb'];
  cucktails['ingredient'] = [];
  cucktails['measure'] = [];
  for (let i = 0; i < 15; i++) {
    if (data[`strIngredient${i}`] != null) {
      cucktails['ingredient'].push(data[`strIngredient${i}`]);
      cucktails['measure'].push(data[`strMeasure${i}`]);
    }
  }
  return cucktails;
}

async function getTop10() {
  cucktailName = ['Old Fashioned', 'Negroni', 'Daiquiri', 'Dirty Martini', 'Margarita', 'Long Island Iced Tea', 'Whiskey Sour', 'Manhattan', 'Aperol Spritz', 'Mojito']
  tenCucktail = []
  for (let i = 0; i < cucktailName.length; i++) {
    const Cocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cucktailName[i]}`
    );
    tenCucktail.push(sanitizeCocktailDB(Cocktail.data['drinks'][0]));
  }
  return tenCucktail;
}

async function getRandom() {
  random = []
  for (let i = 0; i < 6; ++i) {
    const randomCucktail = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    random.push(sanitizeCocktailDB(randomCucktail.data['drinks'][0]));
  }
  return random;
}

module.exports = (app) => {
  app.get('/random', async (req, res) => {
    try {
      random = await getRandom();
      res.send(random);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  app.get('/Top10', async (req, res) => {
    try {
      tenCucktail = await getTop10()
      res.send(tenCucktail);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });
};