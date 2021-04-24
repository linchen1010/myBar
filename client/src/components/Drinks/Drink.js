import React from 'react';
import { useParams } from 'react-router-dom';
import Cocktails from '../Cocktails/Cocktails';
import {Row, Col, Container} from 'react-bootstrap';
export default function Drink() {
  let { category } = useParams();
  return (
    <div style={{ marginTop: '40px' }}>
        
            <div className="cocktailDetailName">{category}</div>
          
      <Cocktails url={`/api/cocktails/drinks/${category}`}/>
    </div>
  );
}
