const express = require('express');
const axios = require('axios');
const popIngredData = require('./popIngredient.json');
const app = express();

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
  app.get('/ingredient/searchID/:ingredient_id', async (req, res) => {
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

  app.get('/ingredient/popIngred', async (req, res) => {
    try {
      res.send(popIngredData);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });
};
