import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
export default function Cucktail(props) {
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
    <div className="cucktail">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs>
            {cucktails.length > 0 &&
              cucktails.map((cucktail) => (
                <div>
                  <img src={cucktail.imageURL} className="img"></img>
                  <h6>{cucktail.name}</h6>
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
