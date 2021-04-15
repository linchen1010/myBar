import React from 'react';
import { Route, Link } from 'react-router-dom';
import IngredientDetail from './IngredientDetail';

export default function Ingredient(props) {
  return (
    <div>
      <div className="cocktail">
        <a as={Link} href={`/ingredients/${props.id}`}>
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
    </div>
  );
}
