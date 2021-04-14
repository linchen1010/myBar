import React, { Suspense } from 'react';
import Cocktails from './Cocktails';

export default function CocktailHome(props) {
  return (
    <div>
      <Cocktails url="/api" title="Top10" />
      <Cocktails url="/api/cocktail/random" title="Random" />
    </div>
  );
}
