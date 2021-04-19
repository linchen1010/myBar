const express = require('express');
const axios = require('axios');
const popIngredData = require('./popIngredient.json');
const router = express.Router()

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
    if (val == null) val = ingredientID.data['drinks'].length;
    for (let index = 0; index < val; index++) {
        relatedCocktails.push(sanitizeRelated(ingredientID.data['drinks'][index]));
    }
    return relatedCocktails;
}

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
        ingredient = await getIngredient(req.params.name);
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
        relatedCocktails = await getNumRelatedCocktails(req.params.name);
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
        relatedCocktails = await getNumRelatedCocktails(req.params.name, req.params.nums);
        res.send(relatedCocktails);
    } catch (err) {
        console.log('Error', err);
        res.status(500).end(err.message);
    }
});




module.exports = router;