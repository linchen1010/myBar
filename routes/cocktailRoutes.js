const express = require('express');
const axios = require('axios');
const top10Data = require('./top10Cocktail.json');
const { route } = require('./ingredientRoutes');
const router = express.Router()
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
  cocktails['id'] = data['idDrink']
  cocktails['name'] = data['strDrink'];
  cocktails['instruction'] = data['strInstructions'];
  cocktails['imageURL'] = data['strDrinkThumb'];
  cocktails['ingredient'] = {};
  cocktails['measure'] = [];
  for (let i = 1; i <= 15; i++) {
    if (data[`strIngredient${i}`] != null && data[`strIngredient${i}`].length > 1) {
      cocktails['ingredient'][data[`strIngredient${i}`]] = {};
      cocktails['ingredient'][data[`strIngredient${i}`]] = getIngredientImg(data[`strIngredient${i}`]);
      cocktails['measure'].push(data[`strMeasure${i}`]);
    }
  }
  return cocktails;
}
/**
 * Sanitize data from search API
 * @param {Object} data (uncleaned data)
 */
function sanitizeSearchResult(data) {
  // let cocktails = {};
  // cocktails['id'] = data['idDrink'];
  // cocktails['imageURL'] = data['strDrinkThumb'];
  // cocktails['type'] = data['strAlcoholic'];
  // return cocktails
}

/**
* Fetch random six cocktails from cocktail API
* Return six random cocktails
* @return {Object}
*/
async function getSixRandom() {
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
* Fetch specific numbers of random cocktails from cocktail API
* Return six random cocktails
* @param {Number} val
* @return {Object}
*/
async function getRandom(val) {
  random = [];
  for (let i = 0; i < val; ++i) {
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
    * Get six random cocktails data
    */
router.get('/cocktails/random', async (req, res) => {
  try {
    random = await getSixRandom();
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
    if (!isNaN(req.params.nums) && Number.isInteger(parseFloat(req.params.nums)) && parseInt(req.params.nums) <= 618) {
      random = await getRandom(req.params.nums);
      res.send(random);
    } else {
      res.send("input is not interger");
      res.status(404);
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


router.get('/cocktails/:cocktail_id', async (req, res) => {
  try {
    const cocktailID = await getCocktailByID(req.params.cocktail_id);
    res.send(cocktailID);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
});

router.get('/cocktails/search/:name', async (req, res) => {
  try {
    const searchResult = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${req.params.name}`);
    if (searchResult.drinks == null) res.send(null);
    else res.json(searchResult);
  } catch (err) {
    console.log('Error', err);
    res.status(500).end(err.message);
  }
})


module.exports = router;