import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Drink from './Drink';
export default function Drinks() {
  return (
    <div>
      <Container>
        <div className="cocktailDetailName">Drinks</div>
        <Row className="m-auto">
          <Col>
            <div className="detailTitle">
              we offer different categories of drinks for you
            </div>
          </Col>
        </Row>
        <Row>
        <Col>
          <Drink/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
