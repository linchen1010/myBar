import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Cucktail from './Cucktail';

export default function Cucktails() {
  const [cucktails, setCucktails] = useState([]);

  // fetch Cocktail
  const fetchCocktail = async () => {
    const res = await axios.get('http://localhost:5000/top10');
    setCucktails(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);
  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          {cucktails.length > 0 &&
            cucktails.map((cucktail, i) => (
              <Col>
                <Cucktail
                  key={i}
                  imageURL={cucktail.imageURL}
                  name={cucktail.name}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
