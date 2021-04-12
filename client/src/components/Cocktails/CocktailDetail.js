import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import About from '../About';

export default function CocktailDetail() {
  const [cocktails, setCocktails] = useState([]);
  let { id } = useParams();

  const fetchCocktail = async () => {
    const res = await axios.get(
      `http://localhost:5000/cocktail/searchID/${id}`
    );
    setCocktails(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);
  return (
    <div>
      <Container>
        <img
          src={cocktails.imageURL}
          alt="cocktail image"
          className="cocktailImg"
        ></img>
        <h1>{cocktails.name}</h1>
        <h2>{cocktails.instruction}</h2>
        {cocktails.ingredient &&
          cocktails.ingredient.map((ingredient, i) => (
            <Row>
              <Col key={i}>{ingredient}</Col>
            </Row>
          ))}
        {cocktails.measure &&
          cocktails.measure.map((measure, i) => (
            <Row>
              <Col>{measure}</Col>
            </Row>
          ))}
      </Container>
    </div>
  );
}
