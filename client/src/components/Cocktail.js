import React from 'react';

export default function Cocktail(props) {
  return (
    <div className="cocktail">
      <img src={props.imageURL} alt="cocktail image" className="img"></img>
      <h6>{props.name}</h6>
    </div>
  );
}
