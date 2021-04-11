const express = require('express');
const axios = require('axios');

const app = express();

const port = 5000;

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

function sanitizeIngredient(data) {
  ingredient = {};
  console.log(data['strIngredient']);
  ingredient['id'] = data['idIngredient'];
  ingredient['name'] = data['strIngredient'];
  ingredient['Description'] = data['strDescription'];
  ingredient['imageURL'] = getIngrediantImg(data['strIngredient']);
  return ingredient;
}

async function getTop10() {
  cocktailName = ['Old Fashioned', 'Negroni', 'Daiquiri', 'Dirty Martini', 'Margarita', 'Long Island Iced Tea', 'Whiskey Sour', 'Manhattan', 'Aperol Spritz', 'Mojito']
  tenCocktail = []
  for (let i = 0; i < cocktailName.length; i++) {
    const cocktail = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName[i]}`
    );
    tenCocktail.push(sanitizeCocktailDB(cocktail.data['drinks'][0]));
  }
  return tenCocktail;
}

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

async function getCocktailByID(val) {
  const cocktailID = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${val}`
  );
  return sanitizeCocktailDB(cocktailID.data['drinks'][0]);
}

async function getIngrediantByID(val) {
  const ingrediantID = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${val}`
  );
  return sanitizeIngredient(ingrediantID.data['ingredients'][0]);
}

function getIngrediantImg(data) {
  return `www.thecocktaildb.com/images/ingredients/${data}-Medium.png`;
}

async function getIngrediant(data) {
  const ingredient = await axios.get(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${data}`
  );
  return sanitizeIngredient(ingredient.data['ingredients'][0]);
}

async function getPopularIngred() {
  ingredName = ['vodka', 'gin', 'rum', 'tequila'];
  popIngred = [];
  for (let i = 0; i < ingredName.length; i++) {
    const temp = await getIngrediant(ingredName[i]);
    popIngred.push(temp);
  }
  console.log(popIngred)
  return popIngred;
}

module.exports = (app) => {
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

  app.get('/cocktail/top10', async (req, res) => {
    try {
      tenCocktail = await getTop10()
      res.send(tenCocktail);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  app.get('/cocktail/searchID/:cocktail_id', async (req, res) => {
    try {
      const cocktailID = await getCocktailByID(req.params.cocktail_id);
      res.send(cocktailID);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });


  app.get('/ingredient/searchName/:name', async (req, res) => {
    try {
      ingredient = await getIngrediant(req.params.name)
      res.send(ingredient);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });


  app.get('/ingredient/searchID/:ingredient_id', async (req, res) => {
    try {
      const ingredientID = await getIngrediantByID(req.params.ingredient_id);
      res.send(ingredientID);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });

  app.get('/ingredient/popIngred', async (req, res) => {
    try {
      ingreds = await getPopularIngred();
      res.send(ingreds);
    } catch (err) {
      console.log('Error', err);
      res.status(500).end(err.message);
    }
  });



};
