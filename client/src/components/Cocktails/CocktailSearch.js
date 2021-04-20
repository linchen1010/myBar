import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Cocktails from './Cocktails';

export default function CocktailSearch() {
  const [drinks, setDrinks] = useState({});
  const [item, setItem] = useState('');

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const updataSearch = () => {
    setItem(query.get('s'));
    console.log(item);
  };
  useEffect(() => {
    updataSearch();
  }, [item]);

  return (
    <div>
      <Container>
        <Row className="justify-content-center cocktailCategory">
          Searching for "{query.get('s')}" ...
        </Row>
        <Row className="justify-content-center">
          {item ? (
            <Cocktails
              url={`/api/cocktails/search/?s=${query.get('s')}`}
            ></Cocktails>
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
    </div>
  );
}
