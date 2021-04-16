import React from 'react';
import Cocktails from './Cocktails';
import Ingredients from '../Ingredients/Ingredients';

export default function CocktailHome(props) {
  return (
    <div>
      <Cocktails url="/api/cocktails/top10" title="Top10" />
      <hr className="divider"></hr>
      <Cocktails url="/api/cocktails/random" title="Random" />
      <hr className="divider"></hr>
      <Ingredients
        url="/api/ingredients/popIngred"
        title="Popular Ingredient"
      />
      <hr className="divider"></hr>
    </div>
  );
}
