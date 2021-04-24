import React from 'react';
import { useParams } from 'react-router-dom';

export default function Drink({ category }) {
  return (
    <div style={{ marginTop: '40px' }}>
      <a href={`/drinks/${category}`}>
        <img
          src="https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
          alt="cocktail"
          className="categoryImg"
        ></img>
      </a>
      <div className="cocktailName">{category}</div>
    </div>
  );
}
