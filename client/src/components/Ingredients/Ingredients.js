import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Ingredient from './Ingredient';

export default function Ingredients(props) {
  const [ingredients, setIngredients] = useState([]);

  //fetch Ingredient

  useEffect(() => {
    const fetchIngredient = async () => {
      const res = await axios.get(props.url);
      setIngredients(res.data);
    };
    fetchIngredient();
  }, []);

  return (
    <div>
      <Container fluid="sm">
        <div className="cocktailCategory">{props.title}</div>
        <Row className="justify-content-md-center">
          {!ingredients.length > 0 ? (
            <Spinner animation="border" />
          ) : (
            ingredients.map((ingredient, i) => (
              <Col key={ingredient.name}>
                <Ingredient
                  imageURL={ingredient.imageURL}
                  name={ingredient.name}
                  id={ingredient.id}
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
