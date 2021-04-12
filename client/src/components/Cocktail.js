import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Cocktail(props) {
  const getID = (cocktail_id) => {
    console.log(cocktail_id);
  };
  return (
    <div className="cocktail">
      <Link to={`/cocktails/${props.id}`}>
        <a href={`/cocktails/${props.id}`}>
          <img
            src={props.imageURL}
            alt="cocktail image"
            className="cocktailImg"
            onClick={() => getID(props.id)}
          ></img>
          <div className="middle">
            <div className="text">See More</div>
          </div>
        </a>
      </Link>
      <h6 className="cocktailName">{props.name}</h6>
    </div>
  );
}
