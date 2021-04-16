import React from 'react';


export default function Cocktail(props) {
  return (
    <div className="cocktail">
      <a href={`/cocktails/${props.id}`}>
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
  );
}
