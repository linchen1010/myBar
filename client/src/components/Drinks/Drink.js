import React from 'react';
import { useParams } from 'react-router-dom';
import Cocktails from '../Cocktails/Cocktails';
import { Row, Col, Container } from 'react-bootstrap';
export default function Drink() {
  let { category } = useParams();
  return (
    <div style={{ marginTop: '40px' }}>
      <div className="cocktailDetailName">{category}</div>

      <div className="categoryDescription">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </div>
      {/* <hr className="divider"></hr> */}
      <Cocktails url={`/api/cocktails/drinks/${category}`} />
      {/* <hr className="divider"></hr> */}
    </div>
  );
}
