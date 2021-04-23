import React from 'react';

export default function Category() {
  let category = 'Cocktail';
  return (
    <div>
      <div className="cocktail">
        <a href={`/drinks/${category}`}>
          <img
            src={props.imageURL}
            alt="cocktail"
            className="cocktailImg"
          ></img>
          <div className="middle">
            <div className="text">See More</div>
          </div>
        </a>
        <div className="cocktailName">{props.category}</div>
      </div>
    </div>
  );
}
