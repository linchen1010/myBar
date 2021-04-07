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

function getCuckTailData(data) {
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

module.exports = (app) => {
  app.get('/', async (req, res) => {
    try {
      const randomCocktail = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      );

      // res.send(randomCocktail.data);
      const cucktail = getCuckTailData(randomCocktail.data['drinks'][0]);
      let outputString = JSON.stringify(cucktail, null, 2);
      res.send(cucktail);
      // console.log(randomCocktail.data['drinks'][0]);
      console.log(cucktail);
      //console.log(data);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });
};
