import React from 'react';
// import * as imgURL from 'categoryImg';
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
        <div className="cocktailName">{category}</div>
      </div>
    </div>
  );
}

const imgURL = {
  'Ordinary Drink':
    'https://images.unsplash.com/photo-1498772776855-2248a3e740f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
  Cocktail:
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  Shot:
    'https://www.liquor.com/thmb/4m10hhFFUocKsj2syDnkWXFppqY=/735x0/__opt__aboutcom__coeus__resources__content_migration__liquor__2016__12__05144234__B52-shot-720sq-a7c7feadc9bb46098c21ae11442ccc64.jpg',
  'Party Drink and Punch':
    'https://images.unsplash.com/photo-1562049070-7e003d30a3d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1567&q=80',
  'Homemade Liqueur':
    'https://images.unsplash.com/photo-1616606296906-1a984217a55b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  Beer:
    'https://images.unsplash.com/photo-1594487984147-3389bcee5078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  'Coffee and Tea':
    'https://images.unsplash.com/photo-1576481564645-b407b8d4567f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
  'Soft Drink and Soda':
    'https://images.unsplash.com/photo-1509404969887-525aab7cc41a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',
};
