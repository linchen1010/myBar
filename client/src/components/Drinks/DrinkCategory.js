import React from 'react';
// import * as imgURL from 'categoryImg';
export default function Category({ category }) {
  return (
    <div>
      <div style={{ marginTop: '40px' }}>
        <a href={`/drinks/cateogry/${category}`}>
          <img
            src={imgURL[`${category}`]}
            alt="cocktail"
            className="categoryImg"
          ></img>
        </a>
        <div className="cocktailName">{category}</div>
      </div>
    </div>
  );
}

const imgURL = {
  'Ordinary Drink':
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  Cocktail:
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  Shot:
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  'Punch / Party Drink':
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  'Homemade Liqueur':
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  Beer:
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  'Coffee / Tea':
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  'Soft Drink / Soda':
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
};
