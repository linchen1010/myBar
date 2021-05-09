import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner, Button, Alert } from 'react-bootstrap';
import Cocktails from './Cocktails';
import { UserContext } from '../../contexts/UserContext';
import FavoriteButton from '../utils/FavoriteButton';
import FlashMessage from 'react-flash-message';

export default function CocktailDetail() {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [ingredientURLs, setIngredientURLs] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [like, setLike] = useState(false);
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [inlist, setInlist] = useState(false);

  const { user } = useContext(UserContext);
  let { id } = useParams();

  const style = {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  };

  const fetchCocktail = async () => {
    const res = await axios.get(`/api/cocktails/${id}`);
    let ingredientData = {};
    let ingreURL = [];
    let ingreNames = [];
    let i = 0;
    for (const [key, val] of Object.entries(res.data.ingredient)) {
      ingredientData[key] = res.data.measure[i++];
      ingreURL = [...ingreURL, val];
      ingreNames = [...ingreNames, key];
    }

    setCocktails(res.data);
    setIngredients(ingredientData);
    setIngredientURLs(ingreURL);
    setIngredientNames(ingreNames);
  };

  const addToFavorite = async () => {
    console.log(cocktails.name);
    const data = {
      drinkId: cocktails.id,
      drinkName: cocktails.name,
      drinkImgURL: cocktails.imageURL,
    };
    // this condition handle post request and the display of the button
    if (!like) {
      const res = await axios.post(`/api/user/favorite`, data);
      setMsg(res.data.message);
      if (res.data.success) setSuccess(res.data.success);
      console.log(res.data);
      setLike(true);
    }
  };

  useEffect(() => {
    fetchCocktail();
  }, []);

  return (
    <div>
      <Container>
        {like && success ? (
          <Row className="justify-content-center flashMsg">
            <FlashMessage duration={2000}>
              <Alert variant="success">{msg}</Alert>
            </FlashMessage>
          </Row>
        ) : (
          <div></div>
        )}
        {like && !success ? (
          <Row className="justify-content-center flashMsg">
            <FlashMessage duration={2000}>
              <Alert variant="danger">{msg}</Alert>
            </FlashMessage>
          </Row>
        ) : (
          <div></div>
        )}
        <Row className="justify-content-center cocktailDetailName">
          <Col md="8">
            <div>{cocktails.name}</div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {!cocktails.imageURL ? (
            <Row className="justify-content-center">
              <Col md="8">
                <Spinner animation="border" style={style} />
              </Col>
            </Row>
          ) : (
            <img
              alt="cocktail can't showed"
              src={cocktails.imageURL}
              className="cocktailDetailImg"
            ></img>
          )}
        </Row>
        {user ? (
          <Row className="justify-content-center">
            <Button
              variant="outline-danger"
              bsPrefix="btn-favorite"
              onClick={() => addToFavorite()}
            >
              <FavoriteButton like={like} />
            </Button>
          </Row>
        ) : (
          <div></div>
        )}
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
            <div>Ingredient</div>
          </Col>
        </Row>
        {Object.keys(ingredients).map((key, i) => (
          <Row className="justify-content-center" key={i}>
            <Col md="8">
              <div style={style}>
                {ingredients[key] != null ? (
                  <h4>
                    {ingredients[key]}
                    <a
                      className="ingredLink"
                      href={`/ingredients/${ingredientNames[i]}`}
                      style={{ marginLeft: '10px' }}
                    >
                      {key}
                    </a>
                  </h4>
                ) : (
                  <h4 style={style}>
                    <a
                      className="ingredLink"
                      href={`/ingredients/${ingredientNames[i]}`}
                      style={{ marginLeft: '10px' }}
                    >
                      {key}
                    </a>
                  </h4>
                )}
              </div>
            </Col>
          </Row>
        ))}
        <Row className="justify-content-center">
          {ingredientURLs.length > 0 &&
            ingredientURLs.map((url, i) => (
              <Col md="sm" key={i}>
                <a href={`/ingredients/${ingredientNames[i]}`}>
                  <img
                    src={url}
                    alt="cocktail"
                    className="detailIngredientImg"
                  ></img>
                </a>
              </Col>
            ))}
        </Row>
        <hr className="detailDivider"></hr>
        <Row className="justify-content-center">
          <Cocktails url="/api/cocktails/random/5" title="See also ..." />
        </Row>
      </Container>
    </div>
  );
}
