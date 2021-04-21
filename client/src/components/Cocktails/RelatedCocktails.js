import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Cocktail from './Cocktail';

export default function RelatedCocktails({ url, title }) {
  const [cocktails, setCocktails] = useState([]);
  const [found, setFound] = useState(true);

  //fetch Cocktail
  const fetchCocktail = async () => {
    const res = await axios.get(url);
    setCocktails(res.data);
    if (res.data.error) setFound(false);
    else setFound(true);
  };
  useEffect(() => {
    fetchCocktail();
  }, [url]);

  return (
    <div>
      {found ? (
        <Container fluid="sm">
          <div className="cocktailCategory">{title}</div>
          <Row className="m-auto">
            {!cocktails.length > 0 ? (
              <Row className="m-auto">
                <Col>
                  <Spinner animation="border" />
                </Col>
              </Row>
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
        </Container>
      ) : (
        <Row className="justify-content-md-center">
          <ResultNotFound />
        </Row>
      )}
    </div>
  );
}

const ResultNotFound = ({ item }) => {
  return <div className="cocktailCategory"></div>;
};
