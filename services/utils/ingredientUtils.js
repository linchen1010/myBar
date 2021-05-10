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
 * Filter unused ingredient data in cocktail API
 * Return data contains ingredient id,name,Description,image URL
 * @param {Object} data
 * @return {Object}
 */
function sanitizeIngredient(data) {
  ingredient = {};
  ingredient['id'] = data['idIngredient'];
  ingredient['name'] = data['strIngredient'];
  ingredient['Description'] = data['strDescription'];
  ingredient['imageURL'] = getIngredientImg(data['strIngredient']);
  return ingredient;
}

function sanitizeRelated(data) {
  relatedCocktails = {};
  // console.log(data['strIngredient']);
  relatedCocktails['id'] = data['idDrink'];
  relatedCocktails['name'] = data['strDrink'];
  relatedCocktails['imageURL'] = data['strDrinkThumb'];
  return relatedCocktails;
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
 * fetch number of related coctail by specific ingredient by name
 * Return filtered relating coctail data
 * @param {Number} name
 * @param {Number} val
 * @return {Object}
 */
async function getNumRelatedCocktails(name, val) {
  const relatedCocktails = [];
  const ingredientID = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`
  );
  // if data not found, return this message to frontend
  if (ingredientID.data['drinks'] == null) {
    return { error: 'Result not found!' };
  }
  if (val == null || val > ingredientID.data['drinks'].length)
    val = ingredientID.data['drinks'].length;
  for (let index = 0; index < val; index++) {
    relatedCocktails.push(sanitizeRelated(ingredientID.data['drinks'][index]));
  }
  return relatedCocktails;
}

module.exports = {
  getIngredientImg,
  sanitizeIngredient,
  sanitizeRelated,
  getIngredient,
  getNumRelatedCocktails,
};
