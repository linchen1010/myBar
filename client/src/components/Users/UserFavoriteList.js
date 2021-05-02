import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
  Spinner,
  Container,
  Row,
  Col,
  Button,
  CardDeck,
  CardColumns,
} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cocktail from '../Cocktails/Cocktail';
import FavoriteItem from './FavoriteItem';
import { set } from 'mongoose';

export default function UserFavoriteList() {
  const { user } = useContext(UserContext);
  const [drinks, setDrinks] = useState([]);
  const [edited, setEdited] = useState(false);

  const { id } = useParams();
  const fetchDrinks = async () => {
    const res = await axios.get(`/api/user/${id}/favorite`);
    setDrinks(res.data);
  };

  // a callback function pass to child component to detect removed
  const detectRemoved = () => {
    setEdited(true);
  };

  useEffect(() => {
    fetchDrinks();
  }, [edited]);
  if (!user)
    return (
      <Row className="m-auto">
        <Col>
          <Spinner animation="border" />
        </Col>
      </Row>
    );
  return (
    <div>
      <Row className="justify-content-center">
        <div className="userProfileTitle">My favorite list</div>
      </Row>
      <Container fluid="md">
        {!drinks.length > 0 ? (
          <Row className="justify-content-center">
            <div className="detailTitle">
              Start add drinks to you collection!
            </div>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <CardColumns>
              {drinks.map((drink, i) => (
                <Col key={i}>
                  <FavoriteItem
                    drinkImgURL={drink.drinkImgURL}
                    drinkName={drink.drinkName}
                    drinkId={drink.drinkId}
                    detectRemoved={detectRemoved}
                  />
                </Col>
              ))}
            </CardColumns>
          </Row>
        )}
      </Container>
    </div>
  );
}
