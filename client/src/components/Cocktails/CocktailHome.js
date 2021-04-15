import React, { Suspense } from 'react';
import Cocktails from './Cocktails';
import Ingredients from '../Ingredients/Ingredients';

export default function CocktailHome(props) {
  return (
    <div>
      <Cocktails url="/api" title="Top10" />
      <Cocktails url="/api/cocktail/random" title="Random" />
      <Ingredients
        url="http://localhost:5000/ingredient/PopIngred"
        title="Popular Ingredient"
      />
    </div>
  );
}