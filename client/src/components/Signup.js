import React from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
export default function Signup() {
  return (
    <div>
      <Container fluid="sm">
        <Row className="cocktailCategory justify-content-center">
          Start your cocktails journey.
        </Row>
        <Form.Group className="loginForm">
          <Form>
            <Form.Control
              className="loginForm"
              type="username"
              placeholder="Username"
              size="lg"
            />
            <Form.Control
              className="loginForm"
              type="password"
              placeholder="Password"
              size="lg"
            />
            <Button variant="success" bsPrefix="btn-default">
              Create account
            </Button>
            <Row className="justify-content-center">
              <div className="formText">
                Already have an account? <a href="/login">Log in</a>
              </div>
            </Row>
          </Form>
        </Form.Group>
      </Container>
    </div>
  );
}
