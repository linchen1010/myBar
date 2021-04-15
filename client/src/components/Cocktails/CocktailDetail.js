import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

export default function CocktailDetail() {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [ingredientURLs, setIngredientURLs] = useState([]);

  let { id } = useParams();
  const style = { textAlign: 'center' };

  const fetchCocktail = async () => {
    const res = await axios.get(`/api/cocktails/${id}`);
    let ingredientData = {};
    let ingreURL = [];
    let i = 0;
    for (const [key, val] of Object.entries(res.data.ingredient)) {
      ingredientData[key] = res.data.measure[i++];
      ingreURL = [...ingreURL, val];
    }

    setCocktails(res.data);
    setIngredients(ingredientData);
    setIngredientURLs(ingreURL);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);

  return (
    <div>
      <Container>
        <Row className="justify-content-center cocktailDetailName">
          <Col md="8">
            <div>{cocktails.name}</div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {!cocktails.imageURL ? (
            <Spinner animation="border" style={style} />
          ) : (
            <img
              alt="cocktail can't showed"
              src={cocktails.imageURL}
              className="cocktailDetailImg"
            ></img>
          )}
        </Row>
        <hr className="detailDivider"></hr>
        <Row className="justify-content-center detailTitle">
          <Col md="8">
            <div>Instruction</div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <div className="cocktailDetailInstruction">
              {cocktails.instruction}
            </div>
          </Col>
        </Row>
        <hr className="detailDivider"></hr>
        <Row className="justify-content-center detailTitle">
          <Col md="8">
            <div>ingredient</div>
          </Col>
        </Row>
        {Object.keys(ingredients).map((key, i) => (
          <Row className="justify-content-center" key={i}>
            <Col md="8">
              <div style={style}>
                {ingredients[key] != null ? (
                  <h4>
                    {ingredients[key]} | {key}
                  </h4>
                ) : (
                  <h4>{key}</h4>
                )}
              </div>
            </Col>
          </Row>
        ))}
        <Row className="justify-content-center detailTitle">
          {/* <Col md="8">
            <div> </div>
          </Col> */}
        </Row>
        <Row className="justify-content-center">
          {ingredientURLs.length > 0 &&
            ingredientURLs.map((url, i) => (
              <Col md="auto" key={i}>
                <img
                  src={url}
                  alt="cocktail image"
                  className="detailIngredientImg"
                ></img>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}