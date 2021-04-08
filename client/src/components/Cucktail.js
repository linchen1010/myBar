import React from 'react';

export default function Cucktail(props) {
  return (
    <div className="cucktail">
      <img src={props.imageURL} alt="cucktail image" className="img"></img>
      <h6>{props.name}</h6>
    </div>
  );
}
