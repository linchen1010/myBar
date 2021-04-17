import React from 'react';
import Cocktails from './Cocktails';
import Ingredients from '../Ingredients/Ingredients';

export default function CocktailHome(props) {
  return (
    <div>
      <Cocktails url="/api/cocktails/top10" title="Top 10 Cocktails" />
      <hr className="divider"></hr>
      <Ingredients
        url="/api/ingredients/popIngred"
        title="Popular Ingredient"
      />
      <hr className="divider"></hr>
      <Cocktails url="/api/cocktails/random" title="Random Cocktails" />
      <hr className="divider"></hr>
    </div>
  );
}
