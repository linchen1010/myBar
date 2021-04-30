import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Collapse, Button } from 'react-bootstrap';
import RelatedCocktails from '.././Cocktails/RelatedCocktails';

export default function IngredientDetail(props) {
  const [ingredient, setIngredient] = useState({});
  const [open, setOpen] = useState(false);

  const { name } = useParams();
  const style = { textAlign: 'center' };

  const fetchIngredient = async () => {
    const res = await axios.get(`/api/ingredients/${name}`);
    setIngredient(res.data);
    console.log(res.data);
    //   console.log(name);
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
              alt="cocktail"
              src={ingredient.imageURL}
              className="cocktailDetailImg"
            ></img>
          )}
        </Row>
        <Row className="justify-content-center" style={{ textAlign: 'center' }}>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="light"
            style={{
              backgroundColor: 'white',
              border: 'none',
              paddingBottom: '0px',
            }}
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
          <Collapse in={open}>
            <Row className="justify-content-center">
              <Col md="8">
                {ingredient.Description ? (
                  <div className="ingredientDescription">
                    {ingredient.Description}
                  </div>
                ) : (
                  <div className="ingredientDescription">
                    Just common {ingredient.name} : )
                  </div>
                )}
              </Col>
            </Row>
          </Collapse>
        </Row>
        {ingredient.imageURL ? (
          <hr className="detailDivider"></hr>
        ) : (
          <div></div>
        )}
        <Row className="justify-content-center">
          {!ingredient.name ? (
            <div></div>
          ) : (
            <RelatedCocktails
              url={`/api/ingredients/${ingredient.name}/relatedCocktails/10`}
              title={`Cocktails that use ${ingredient.name} ...`}
            />
          )}
        </Row>
      </Container>
    </div>
  );
}
