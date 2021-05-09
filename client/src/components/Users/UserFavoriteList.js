import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Spinner, Container, Row, Col, CardColumns } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import FavoriteItem from './FavoriteItem';

export default function UserFavoriteList() {
  const { user } = useContext(UserContext);
  const [drinks, setDrinks] = useState([]);
  const [edited, setEdited] = useState(false);

  const fetchDrinks = async () => {
    if (user) {
      const res = await axios.get(`/api/user/favorite`);
      setDrinks(res.data);
    }
  };

  // a callback function pass to child component to detect removed
  const detectRemoved = () => {
    setEdited(!edited);
  };

  useEffect(() => {
    fetchDrinks();
  }, [edited, user]);
  if (!user)
    return (
      <Container>
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      </Container>
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
              Start adding drinks to your favorite list!
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
