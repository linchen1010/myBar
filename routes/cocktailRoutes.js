const express = require('express');
const axios = require('axios');
const top10Data = require('./top10Cocktail.json')
const router = express.Router()
const port = 5000;


/**
* Fetch ingredient image by name
* Return that ingredient medium size image 
* @param {Object} data
* @return {Object}
*/
function getIngredientImg(name) {
  return `www.thecocktaildb.com/images/ingredients/${name}-Medium.png`;
}

/**
* Filter unused cocktail data in cocktail API 
* Return data contains cocktail id,name,instruction,image URL, ingredient, measure.
* @param {Object} data
* @return {Object}
*/
function sanitizeCocktailDB(data) {
  let cocktails = {};
  cocktails['id'] = data['idDrink']
  cocktails['name'] = data['strDrink'];
  cocktails['instruction'] = data['strInstructions'];
  cocktails['imageURL'] = data['strDrinkThumb'];
  cocktails['ingredient'] = {};
  cocktails['measure'] = [];
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`] != null) {
      cocktails['ingredient'][data[`strIngredient${i}`]] = {};
      cocktails['ingredient'][data[`strIngredient${i}`]] = getIngredientImg(data[`strIngredient${i}`]);
      cocktails['measure'].push(data[`strMeasure${i}`]);
    }
  }
  return cocktails;
}

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

router.get('/:cocktail_id', async (req, res) => {
  try {
    const cocktailID = await getCocktailByID(req.params.cocktail_id);
    res.send(cocktailID);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

module.exports = router;