import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Drink from './Drink';
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
        <Row className="justify-content-center" style={{ textAlign: 'center' }}>
          <Col>
            <Drink category="Ordinary Drink" />
          </Col>
          <Col>
            <Drink category="Cocktail" />
          </Col>
          <Col>
            <Drink category="Shot" />
          </Col>
          <Col>
            <Drink category="Punch / Party Drink" />
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ textAlign: 'center' }}>
          <Col>
            <Drink category="Homemade Liqueur" />
          </Col>
          <Col>
            <Drink category="Punch / Party Drink" />
          </Col>
          <Col>
            <Drink category="Coffee / Tea" />
          </Col>
          <Col>
            <Drink category="Soft Drink / Soda" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
