import React, { useState } from 'react';
import { Container, Form, Button, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
export default function Signup() {
  const [customerSignUp, setCustomerSignUp] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [msg, setMsg] = useState('');
  const [signupMsg, setSignupMsg] = useState('');
  const handleChange = (event) => {
    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(customerSignUp);

    let res = await axios.post('/api/signup', customerSignUp);
    console.log(res);
    if (res.data.message) {
      // error occur, setMsg and display
      setMsg(res.data.message);
    } else {
      // successfully sign up, redirect to login
      setSignupMsg(
        'Your account has been successfully created, please log in at next page!'
      );
      setTimeout(() => window.location.assign('/login'), 2000);
    }
  };

  return (
    <div>
      <Container fluid="sm">
        {msg.length > 0 ? (
          <Row className="justify-content-center">
            <Alert variant="danger" className="flashMsg">
              {msg}
            </Alert>
          </Row>
        ) : (
          <div></div>
        )}
        {signupMsg.length > 0 ? (
          <Row className="justify-content-center">
            <Alert variant="success" className="flashMsg">
              {signupMsg}
            </Alert>
          </Row>
        ) : (
          <div></div>
        )}
        <Row className="cocktailCategory justify-content-center">
          Start your cocktails journey.
        </Row>
        <Form.Group className="loginForm">
          <Form onSubmit={handleSubmit}>
            <a href="/auth/google">
              <Button variant="success" bsPrefix="btn-google">
                <img
                  className="googleImg"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="googleLogo"
                ></img>{' '}
                Sign up with Google
              </Button>
            </a>
            <div className="formText">or</div>
            <Form.Control
              type="username"
              name="username"
              placeholder="Username"
              value={customerSignUp.username}
              onChange={handleChange}
              size="lg"
              required
            />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={customerSignUp.email}
              onChange={handleChange}
              size="lg"
              required
            />
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={customerSignUp.password}
              onChange={handleChange}
              size="lg"
              required
            />
            <Button variant="success" bsPrefix="btn-form" type="submit">
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
