import React from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
export default function Login() {
  return (
    <div>
      <Container fluid="sm">
        <Row className="cocktailCategory justify-content-center">Log In</Row>
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
            <Button variant="success" bsPrefix="btn-form">
              Login
            </Button>
            <Row className="justify-content-center">
              <div className="formText">
                Do not have an account yet? <a href="/signup">Sign up here!</a>
              </div>
            </Row>
          </Form>
        </Form.Group>
      </Container>
    </div>
  );
}
