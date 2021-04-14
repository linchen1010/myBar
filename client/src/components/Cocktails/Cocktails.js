import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Cocktail from './Cocktail';

export default function Cocktails(props) {
  const [cocktails, setCocktails] = useState([]);

  // fetch Cocktail
  console.log("in cokctails")
  const fetchCocktail = async () => {
    const res = await axios.get("/api");
    setCocktails(res.data);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);
  
  return (
    <div>
      
      <Container fluid="sm">
        <div className="cocktailCategory">{props.title}</div>
        <Row className="justify-content-md-center">
          {!cocktails.length > 0 ? (
            <Spinner animation="border" />
          ) : (
            cocktails.map((cocktail, i) => (
              <Col key={cocktail.name}>
                <Cocktail
                  imageURL={cocktail.imageURL}
                  name={cocktail.name}
                  id={cocktail.id}
                />
              </Col>
            ))
          )}
        </Row>
        <hr className="divider"></hr>
      </Container>
    </div>
  );
}
