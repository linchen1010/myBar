import React from 'react';

export default function Cocktail(props) {
  return (
    <div className="cocktail">
      <a href="#">
        <img
          src={props.imageURL}
          alt="cocktail image"
          className="cocktailImg"
        ></img>
        <div className="middle">
          <div className="text">See More</div>
        </div>
      </a>
      <h6 className="cocktailName">{props.name}</h6>
    </div>
  );
}
