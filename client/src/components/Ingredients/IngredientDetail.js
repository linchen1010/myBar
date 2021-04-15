import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Collapse, Button, Fade } from 'react-bootstrap';

export default function IngredientDetail(props) {
  const [ingredient, setIngredient] = useState({});
  const [open, setOpen] = useState(false);

  let { name } = useParams();
  const style = { textAlign: 'center' };

  const fetchIngredient = async () => {
    const res = await axios.get(`/api/ingredients/${name}`);
    setIngredient(res.data);
    console.log(res.data);
    console.log(name);
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
        <Row className="justify-content-center" style={{ textAlign: 'center' }}>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-fade-text"
            aria-expanded={open}
            variant="link"
            size="lg"
          >
            <div
              style={{ color: 'rgb(0, 106, 148)', textAlign: 'center' }}
              className="detailTitle"
            >
              Some fun facts ...
            </div>
          </Button>
        </Row>
        <Row className="justify-content-center">
          <Fade in={open}>
            <Row className="justify-content-center">
              <Col md="8">
                {ingredient.Description ? (
                  <div className="ingredientDescription">
                    {ingredient.Description}
                  </div>
                ) : (
                  <h3>Just a common {ingredient.name} : )</h3>
                )}
              </Col>
            </Row>
          </Fade>
        </Row>
      </Container>
    </div>
  );
}
