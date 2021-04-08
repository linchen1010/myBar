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
        <div class="middle">
          <div class="text">see more</div>
        </div>
      </a>
      <h6 className="cocktailName">{props.name}</h6>
    </div>
  );
}
