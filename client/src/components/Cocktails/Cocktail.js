import React from 'react';

export default function Cocktail(props) {
  return (
    <div className="cocktail" style={{ marginBottom: '20px' }}>
      <a href={`/cocktails/${props.id}`}>
        <img src={props.imageURL} alt="cocktail" className="cocktailImg"></img>
        <div className="middle">
          <div className="text">See More</div>
        </div>
      </a>
      <a className="cocktailNameLink" href={`/cocktails/${props.id}`}>
        <div className="cocktailName">{props.name}</div>
      </a>
    </div>
  );
}
