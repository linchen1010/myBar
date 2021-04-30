import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row } from 'react-bootstrap';
export default function Login() {

  const [customerSignUp, setCustomerSignUp] = useState(
    { email: '', password: '' }
  );
  const handleChange = (event) => {
    setCustomerSignUp({ ...customerSignUp, [event.target.name]: event.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(customerSignUp);
    let res = await axios.post('/api/login', customerSignUp)
    console.log(res.data.message)
    if (res.data === "") {
      window.location.assign('/login')
    } else {
      window.location.assign('/')
    }
  }
  return (
    <div>
      <Container fluid="sm">
        <Row className="cocktailCategory justify-content-center">Log In</Row>
        <Form.Group className="loginForm">
          <Form onSubmit={handleSubmit}>
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
            <Button variant="success" bsPrefix="btn-form" type="submit" >
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
