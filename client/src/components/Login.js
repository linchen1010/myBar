import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Alert, Fade } from 'react-bootstrap';
import FlashMessage from 'react-flash-message';
import { UserContext } from '../contexts/UserContext';

export default function Login() {
  const [customerSignUp, setCustomerSignUp] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const { user } = useContext(UserContext);
  const handleChange = (event) => {
    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post('/api/login', customerSignUp);

    if (res.data.message) {
      // error occurs, set msg and display
      setMsg(res.data.message);
    } else {
      setLoginMsg('Successfully logged in!');
      setTimeout(() => window.location.assign('/'), 2000);
    }
  };
  return (
    <div>
      <Container fluid="sm">
        {msg.length > 0 && loginMsg.length == 0 ? (
          <Row className="justify-content-center">
            <Alert variant="danger" className="flashMsg">
              {msg}
            </Alert>
          </Row>
        ) : (
          <div></div>
        )}
        {loginMsg.length > 0 ? (
          <Row className="justify-content-center">
            <Alert variant="success" className="flashMsg">
              {loginMsg}
            </Alert>
          </Row>
        ) : (
          <div></div>
        )}
        <Row className="cocktailCategory justify-content-center">Log In</Row>
        <Form.Group className="loginForm">
          <Form onSubmit={handleSubmit}>
            <a href="/auth/google">
              <Button variant="success" bsPrefix="btn-google">
                <img
                  className="googleImg"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="googleLogo"
                ></img>{' '}
                Login in with Google
              </Button>
            </a>
            <div className="formText">or</div>
            <Form.Control
              className="loginForm"
              type="email"
              name="email"
              placeholder="Email"
              value={customerSignUp.email}
              onChange={handleChange}
              size="lg"
              required
            />
            <Form.Control
              className="loginForm"
              type="password"
              name="password"
              placeholder="Password"
              value={customerSignUp.password}
              onChange={handleChange}
              size="lg"
              required
            />
            {/* {
              state.message
            } */}
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

const Msg = () => {
  // const user = await axios.get('/api/current_user');
  return (
    <div>
      <Alert variant="success">{`Log Success`}</Alert>
    </div>
  );
};
