import React, { useState } from 'react';
import { Container, Row, Col, Button, CloseButton } from 'react-bootstrap';
import Cocktails from '../Cocktails/Cocktails';
import DrinkCategory from './DrinkCategory';

const style = {
  fontWeight: '600',
};

export default function Drinks() {
  const [random, setRandom] = useState(false);
  const click = () => {
    setRandom(!random);
  };

  return (
    <div>
      <Container fluid="sm">
        <div className="cocktailDetailName">Drinks</div>
        <Row className="justify-content-md-center">
          <Col>
            <div className="detailTitle">
              We offer different categories of drinks for you
            </div>
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          <Col>
            <DrinkCategory category="Ordinary Drink" />
          </Col>
          <Col>
            <DrinkCategory category="Cocktail" />
          </Col>
          <Col>
            <DrinkCategory category="Shot" />
          </Col>
          <Col>
            <DrinkCategory category="Party Drink and Punch" />
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <Col>
            <DrinkCategory category="Homemade Liqueur" />
          </Col>
          <Col>
            <DrinkCategory category="Beer" />
          </Col>
          <Col>
            <DrinkCategory category="Coffee and Tea" />
          </Col>
          <Col>
            <DrinkCategory category="Soft Drink and Soda" />
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <Col>
            <div className="detailTitle">No idea what to get?</div>
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          <Col>
            <Button
              variant="outline-info"
              style={style}
              onClick={() => click()}
            >
              Random
            </Button>
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          {random ? (
            <Cocktails
              url="api/cocktails/random/5"
              title="Let's pick one below : )"
            />
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
    </div>
  );
}
