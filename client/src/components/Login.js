import React from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
export default function Login() {
  return (
    <div>
      <Container fluid="sm">
        <Row className="cocktailCategory justify-content-center">Log In</Row>
        <Form.Group className="loginForm">
          <Form>
            <a href="/auth/google">
              <Button variant="success" bsPrefix="btn-google">
                <img
                  className="googleImg"
                  src="https://developers.google.com/identity/images/g-logo.png"
                ></img>{' '}
                Login in with Google
              </Button>
            </a>
            <div className="formText">or</div>
            <Form.Control
              className="loginForm"
              type="email"
              placeholder="Email"
              size="lg"
              required
            />
            <Form.Control
              className="loginForm"
              type="password"
              placeholder="Password"
              size="lg"
              required
            />
            <Button variant="success" bsPrefix="btn-form" type="submit">
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
