import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Cocktail from './Cocktail';

export default function Cocktails({ url, title }) {
  const [cocktails, setCocktails] = useState([]);
  const [fetchURL, setFetchURL] = useState(url);
  const [found, setFound] = useState(true);
  //fetch Cocktail
  const fetchCocktail = async () => {
    const res = await axios.get(url);
    setCocktails(res.data);
    console.log(res);
    setFetchURL(url);
    if (res.data.error) setFound(false);
    else setFound(true);
    console.log(cocktails);
    console.log(url);
  };
  useEffect(() => {
    fetchCocktail();
  }, [url]);

  return (
    <div>
      {found ? (
        <Container fluid="sm">
          <div className="cocktailCategory">{title}</div>
          <Row className="justify-content-md-center">
            {!cocktails.length > 0 ? (
              <Row className="justify-content-md-center">
                <Col md="8">
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
          {/* <hr className="divider"></hr> */}
        </Container>
      ) : (
        <div className="cocktailCategory">
          {title}
          <ResultNotFound item={title} />
        </div>
      )}
    </div>
  );
}

const ResultNotFound = ({ item }) => {
  return <div className="cocktailCategory">No results found</div>;
};
