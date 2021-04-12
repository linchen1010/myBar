import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Cocktail from './Cocktail';

export default function Cocktails() {
  const [cocktails, setCocktails] = useState([]);

  // fetch Cocktail
  const fetchCocktail = async () => {
    const res = await axios.get('http://localhost:5000/cocktail/top10');
    setCocktails(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);
  return (
    <div>
      <Container fluid="sm">
        <h1 className="cocktailCategory">Top 10</h1>
        <Row className="justify-content-md-center">
          {cocktails.length > 0 &&
            cocktails.map((cocktail, i) => (
              <Col key={cocktail.name}>
                <Cocktail
                  imageURL={cocktail.imageURL}
                  name={cocktail.name}
                  id={cocktail.id}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
