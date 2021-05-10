const express = require('express');
const axios = require('axios');
const popIngredData = require('../services/drinkData/popIngredient.json');
const router = express.Router();
const utils = require('../services/utils/ingredientUtils');

/**
 * Get 4 popular ingredient from locol json data
 */
router.get('/ingredients/popIngred', async (req, res) => {
  try {
    res.send(popIngredData);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

/**
 * Get specific ingredient by ingredient name
 */
router.get('/ingredients/:name', async (req, res) => {
  try {
    ingredient = await utils.getIngredient(req.params.name);
    res.send(ingredient);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

/**
 * Get related cocktails by specific ingredient name
 */
router.get('/ingredients/:name/relatedCocktails', async (req, res) => {
  try {
    relatedCocktails = await utils.getNumRelatedCocktails(req.params.name);
    res.send(relatedCocktails);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

/**
 * Get number of related cocktails by specific ingredient name
 */

router.get('/ingredients/:name/relatedCocktails/:nums', async (req, res) => {
  try {
    relatedCocktails = await utils.getNumRelatedCocktails(
      req.params.name,
      req.params.nums
    );
    res.send(relatedCocktails);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

module.exports = router;
