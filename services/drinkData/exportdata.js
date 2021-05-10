const express = require('express');
const axios = require('axios');
const fs = require("fs");
const app = express();

function getIngredientImg(data) {
    return `www.thecocktaildb.com/images/ingredients/${data}-Medium.png`;
}

function sanitizeIngredient(data) {
    ingredient = {};
    console.log(data['strIngredient']);
    ingredient['id'] = data['idIngredient'];
    ingredient['name'] = data['strIngredient'];
    ingredient['Description'] = data['strDescription'];
    ingredient['imageURL'] = getIngredientImg(data['strIngredient']);
    return ingredient;
}

function sanitizeIngredHome(data) {
    ingredient = {};
    console.log(data['strIngredient']);
    ingredient['id'] = data['idIngredient'];
    ingredient['name'] = data['strIngredient'];
    ingredient['imageURL'] = getIngredientImg(data['strIngredient']);
    return ingredient;
}


async function getIngredient(data) {
    const ingredient = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${data}`
    );
    return sanitizeIngredient(ingredient.data['ingredients'][0]);
}


const getPopularIngred = async () => {
    ingredName = ['vodka', 'gin', 'rum', 'tequila'];
    popIngred = [];
    for (let i = 0; i < ingredName.length; i++) {
        const temp = await getIngredient(ingredName[i]);
        popIngred.push(temp);
    }
    fs.writeFileSync("./popIngredient.json", JSON.stringify(popIngred));
}

getPopularIngred();
