const express = require('express');
const axios = require('axios');
const top10Data = require('./top10Cocktail.json');
const app = express();

const port = 5000;

/**
 * Fetch ingredient image by name
 * Return that ingredient medium size image
 * @param {Object} data
 * @return {Object}
 */
function getIngredientImg(name) {
  return `https://www.thecocktaildb.com/images/ingredients/${name}-Medium.png`;
}

/**
 * Filter unused cocktail data in cocktail API
 * Return data contains cocktail id,name,instruction,image URL, ingredient, measure.
 * @param {Object} data
 * @return {Object}
 */
function sanitizeCocktailDB(data) {
  let cocktails = {};
  cocktails['id'] = data['idDrink'];
  cocktails['name'] = data['strDrink'];
  cocktails['instruction'] = data['strInstructions'];
  cocktails['imageURL'] = data['strDrinkThumb'];
  cocktails['ingredient'] = {};
  cocktails['measure'] = [];
  for (let i = 1; i <= 15; i++) {
    // length > 2, since there are some data error in cocktailDB like '-' which "!=null" could not catch
    if (
      data[`strIngredient${i}`] != null &&
      data[`strIngredient${i}`].length > 2
    ) {
      cocktails['ingredient'][data[`strIngredient${i}`]] = {};
      cocktails['ingredient'][data[`strIngredient${i}`]] = getIngredientImg(
        data[`strIngredient${i}`]
      );
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

/**
 * Filter unused ingredient data in cocktail API
 * Return data contains ingredient id,name,Description,image URL
 * @param {Object} data
 * @return {Object}
 */
function sanitizeIngredient(data) {
  ingredient = {};
  console.log(data['strIngredient']);
  ingredient['id'] = data['idIngredient'];
  ingredient['name'] = data['strIngredient'];
  ingredient['Description'] = data['strDescription'];
  ingredient['imageURL'] = getIngredientImg(data['strIngredient']);
  return ingredient;
}

/**
 * fetch specific ingredient by name
 * Return filtered one ingredient data
 * @param {Number} name
 * @return {Object}
 */

async function getIngredient(name) {
  const ingredient = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`
  );
  return sanitizeIngredient(ingredient.data['ingredients'][0]);
}

/**
 * Search specific ingredient by id
 * Return filtered one ingredient data
 * @param {Number} id
 * @return {Object}
 */
async function getIngredientByID(id) {
  const ingredientID = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${id}`
  );
  return sanitizeIngredient(ingredientID.data['ingredients'][0]);
}

module.exports = (app) => {
  /**
   * { top10: {}, random: {} ...
   * }
   */
  /**
   * Get six random cocktails data
   */
  app.get('/api/cocktail/random', async (req, res) => {
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
  app.get('/api', async (req, res) => {
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
  app.get('/api/cocktails/:cocktail_id', async (req, res) => {
    try {
      const cocktailID = await getCocktailByID(req.params.cocktail_id);
      res.send(cocktailID);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  /**
   * Get specific ingredient by ingredient name
   */
  app.get('/ingredient/searchName/:name', async (req, res) => {
    try {
      ingredient = await getIngredient(req.params.name);
      res.send(ingredient);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  /**
   * Get specific ingredient by ingredient id
   */
  app.get('/api/ingredients/:ingredient_id', async (req, res) => {
    try {
      const ingredientID = await getIngredientByID(req.params.ingredient_id);
      res.send(ingredientID);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  /**
   * Get 4 popular ingredient from locol json data
   */

  app.get('/api/ingredients/popIngred', async (req, res) => {
    try {
      res.send(popIngredData);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });
};
