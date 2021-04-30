import React from 'react';
import Cocktails from './Cocktails';
import Ingredients from '../Ingredients/Ingredients';
import HomeCover from '../HomeCover';

export default function CocktailHome(props) {
  return (
    <div>
      <HomeCover />
      <Cocktails url="/api/cocktails/top10" title="Top 10 Cocktails" />
      <hr className="divider"></hr>
      <Ingredients
        url="/api/ingredients/popIngred"
        title="Popular Ingredients"
      />
      <hr className="divider"></hr>
      <Cocktails url="/api/cocktails/random" title="Random Drinks" />
      <hr className="divider"></hr>
    </div>
  );
}
