import React from 'react';
import CocktailDetail from './CocktailDetail';
import { Route, Link } from 'react-router-dom';

export default function Cocktail(props) {
  return (
    <div className="cocktail">
      <a as={Link} href={`/cocktails/${props.id}`}>
        <img
          src={props.imageURL}
          alt="cocktail image"
          className="cocktailImg"
        ></img>
        <div className="middle">
          <div className="text">See More</div>
        </div>
      </a>
      <div className="cocktailName">{props.name}</div>
    </div>
  );
}
