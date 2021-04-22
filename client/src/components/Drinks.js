import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
      </Container>
    </div>
  );
}
