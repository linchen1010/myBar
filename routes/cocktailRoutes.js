const express = require('express');
const axios = require('axios');
const top10Data = require('./top10Cocktail.json')
const app = express();

const port = 5000;


/**
* Filter unused cocktail data in cocktail API 
* Return data contains cocktail id,name,instruction,image URL, ingredient, measure.
* @param {Object} data
* @return {Object}
*/
function sanitizeCocktailDB(data) {
  cocktails = {};
  cocktails['id'] = data['idDrink']
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


/* 
get top 10 cocktail data from cocktail API 
(currently not use this function)
*/
// async function getTop10() {
//   cocktailName = ['Old Fashioned', 'Negroni', 'Daiquiri', 'Dirty Martini', 'Margarita', 'Long Island Iced Tea', 'Whiskey Sour', 'Manhattan', 'Aperol Spritz', 'Mojito']
//   tenCocktail = []
//   for (let i = 0; i < cocktailName.length; i++) {
//     const cocktail = await axios.get(
//       `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName[i]}`
//     );
//     tenCocktail.push(sanitizeCocktailDB(cocktail.data['drinks'][0]));
//   }
//   return tenCocktail;
// }


/**
* Fetch random six cocktails from cocktail API
* Return six random cocktails
* @return {Object}
*/
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

/**
* Search specific cocktail by id
* Return filtered one cocktail data
* @param {Number} id
* @return {Object} 
*/
async function getCocktailByID(id) {
  const cocktailID = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return sanitizeCocktailDB(cocktailID.data['drinks'][0]);
}

module.exports = (app) => {

  /**
  * Get six random cocktails data
  */
  app.get('/cocktail/random', async (req, res) => {
    try {
      random = await getRandom();
      console.log(random);
      res.send(random);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  /**
  * Get top10 cocktails from local json data
  */
  app.get('/cocktail/top10', async (req, res) => {
    try {
      res.send(top10Data);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  /**
  * Get specific cocktail by cocktail id
  */
  app.get('/cocktail/searchID/:cocktail_id', async (req, res) => {
    try {
      const cocktailID = await getCocktailByID(req.params.cocktail_id);
      res.send(cocktailID);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

};
