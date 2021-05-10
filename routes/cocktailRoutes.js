const express = require('express');
const axios = require('axios');
const top10Data = require('../services/drinkData/top10Cocktail.json');
const { route, search } = require('./ingredientRoutes');
const router = express.Router();
const utils = require('../services/utils/cocktailsUtils');
/**
 * Get six random cocktails data
 */
router.get('/cocktails/random', async (req, res) => {
  try {
    random = await utils.getSixRandom();
    res.send(random);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

/**
 * Get specific numbers of random cocktail data
 *
 */
router.get('/cocktails/random/:nums', async (req, res) => {
  try {
    // console.log(!isNaN(req.params.nums))
    if (
      !isNaN(req.params.nums) &&
      Number.isInteger(parseFloat(req.params.nums)) &&
      parseInt(req.params.nums) <= 618
    ) {
      random = await utils.getRandom(req.params.nums);
      res.send(random);
    } else {
      // res.send('input is not interger');
      res.status(404).end('input is not interger');
    }
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

/**
 * Get top10 cocktails from local json data
 */
router.get('/cocktails/top10', async (req, res) => {
  try {
    res.send(top10Data);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

router.get('/cocktails/drinks/:category', async (req, res) => {
  try {
    const drinks = await utils.getCatergoryDrinks(req.params.category);
    res.send(drinks);
  } catch (err) {
    console.log('Error', err);
    res.status(500).send(err.message);
  }
});

router.get('/cocktails/search', async (req, res) => {
  try {
    const searchResult = await utils.getSearchResult(req.query);
    // console.log(searchResult);
    res.send(searchResult);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

router.get('/cocktails/:cocktail_id', async (req, res) => {
  try {
    const cocktailID = await utils.getCocktailByID(req.params.cocktail_id);
    res.send(cocktailID);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

module.exports = router;
