import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

export default function IngredientDetail(props) {
  const [ingredient, setIngredient] = useState({});

  let { id } = useParams();
  const style = { textAlign: 'center' };

  const fetchIngredient = async () => {
    const res = await axios.get(`/api/ingredients/${id}`);
    setIngredient(res.data);
    console.log(res.data);
    console.log(id);
  };

  useEffect(() => {
    fetchIngredient();
  }, []);
  return (
    <div>
      <Container>
        <Row className="justify-content-center cocktailDetailName">
          <Col md="8">
            <div>{ingredient.name}</div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {!ingredient.imageURL ? (
            <Spinner animation="border" style={style} />
          ) : (
            <img
              alt="cocktail can't showed"
              src={ingredient.imageURL}
              className="cocktailDetailImg"
            ></img>
          )}
        </Row>
        {ingredient.imageURL ? (
          <hr className="detailDivider"></hr>
        ) : (
          <div></div>
        )}
        <Row className="justify-content-center detailTitle">
          <Col md="8">
            {ingredient.imageURL ? (
              <div style={{ color: 'rgb(0, 106, 148)' }}>
                Some fun facts ...
              </div>
            ) : (
              <div></div>
            )}
          </Col>
          {/* <Col md="8">
            <div style={{ color: 'rgb(0, 106, 148)' }}>{ingredient.name}</div>
          </Col> */}
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <div className="ingredientDescription">
              {ingredient.Description}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
