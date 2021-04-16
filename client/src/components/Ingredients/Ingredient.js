import React from 'react';


export default function Ingredient(props) {
  return (
    <div>
      <div className="cocktail">
        <a href={`/ingredients/${props.name}`}>
          <img
            src={props.imageURL}
            alt="cocktail"
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
