import React, { Suspense } from 'react';
import Cocktails from './Cocktails';
import Ingredients from '../Ingredients/Ingredients';

export default function CocktailHome(props) {
  return (
    <div>
      <Cocktails url="/top10" title="Top10" />
      <Cocktails url="/api/cocktail/random" title="Random" />
      <Ingredients
        url="/api/ingredients/popIngred"
        title="Popular Ingredient"
      />
    </div>
  );
}
