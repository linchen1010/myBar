import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Cocktail from './Cocktail';

export default function Cocktails() {
  const [cocktails, setCocktails] = useState([]);

  // fetch Cocktail
  const fetchCocktail = async () => {
    const res = await axios.get('http://localhost:5000/top10');
    setCocktails(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);
  return (
    <div>
      <Container fluid="sm">
        <Row className="justify-content-md-center">
          {cocktails.length > 0 &&
            cocktails.map((cocktail, i) => (
              <Col>
                <Cocktail
                  key={i}
                  imageURL={cocktail.imageURL}
                  name={cocktail.name}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
