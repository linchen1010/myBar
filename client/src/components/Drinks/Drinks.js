import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DrinkCategory from './DrinkCategory';
export default function Drinks() {
  return (
    <div>
      <Container fluid="sm">
        <div className="cocktailDetailName">Drinks</div>
        <Row className="justify-content-md-center">
          <Col>
            <div className="detailTitle">
              we offer different categories of drinks for you
            </div>
          </Col>
        </Row>
        <Row
          className="justify-content-center"
          style={{ textAlign: 'center', marginTop: '40px' }}
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
            <DrinkCategory category="Punch / Party Drink" />
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
            <DrinkCategory category="Coffee / Tea" />
          </Col>
          <Col>
            <DrinkCategory category="Soft Drink / Soda" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
