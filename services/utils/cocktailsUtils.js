const axios = require('axios');

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
    if (
      data[`strIngredient${i}`] != null &&
      data[`strIngredient${i}`].length > 1
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
 * Sanitize data from search API
 * @param {Object} data (uncleaned data)
 */
function sanitizeSearchData(data) {
  let cocktails = {};
  cocktails['id'] = data['idDrink'];
  cocktails['name'] = data['strDrink'];
  cocktails['imageURL'] = data['strDrinkThumb'];

  return cocktails;
}
/**
 * given a query, return search result
 * @param {*} query that users want to search
 * @returns
 */
async function getSearchResult(query) {
  // console.log(query);
  const searchResult = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query.s}`
  );
  if (searchResult.data['drinks'] == null)
    return { error: 'Result not found!' };

  let cocktails = [];
  for (let i = 0; i < searchResult.data['drinks'].length; i++) {
    cocktails.push(sanitizeSearchData(searchResult.data['drinks'][i]));
  }

  return cocktails;
}

async function getCatergoryDrinks(category) {
  if (category == 'Soft Drink and Soda') category = 'Soft Drink / Soda';
  else if (category == 'Coffee and Tea') category = 'Coffee / Tea';
  else if (category == 'Party Drink and Punch')
    category = 'Punch / Party Drink';
  const categoryDrinks = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
  );

  if (categoryDrinks.data['drinks'] == null)
    return { error: 'Result not found!' };

  let drinks = [];

  for (let i = 0; i < categoryDrinks.data['drinks'].length; i++) {
    drinks.push(sanitizeSearchData(categoryDrinks.data['drinks'][i]));
  }

  return drinks;
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

module.exports = {
  getIngredientImg,
  sanitizeCocktailDB,
  sanitizeSearchData,
  getSearchResult,
  getCatergoryDrinks,
  getSixRandom,
  getRandom,
  getCocktailByID,
};
