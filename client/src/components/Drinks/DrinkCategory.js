import React from 'react';
const {imgURL} = require('./categoryImg');

export default function Category({ category }) {
  return (
    <div>
      <div style={{ marginTop: '40px' }}>
        <a href={`/drinks/category/${category}`}>
          <img
            src={imgURL[`${category}`]}
            alt="cocktail"
            className="categoryImg"
          ></img>
        </a>
        <a className="ingredLink" href={`/drinks/category/${category}`}>
          <div className="cocktailName">{category}</div>
        </a>
      </div>
    </div>
  );
}
