import React, { useState } from 'react';
import { Container, Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';
export default function Signup() {
  const [customerSignUp, setCustomerSignUp] = useState(
    { email: '', password: '', username: '' }
  );
  const handleChange = (event) => {
    setCustomerSignUp({ ...customerSignUp, [event.target.name]: event.target.value })
  }


  const handleSubmit = async e => {

    e.preventDefault();

    console.log(customerSignUp);

    let res = await axios.post('/api/signup', customerSignUp)
    console.log(res)
    if (res.data == "") {
      window.location.assign('/login')
    } else {
      console.log(res.data)
      window.location.assign('/signup')
    }
    // if (res.status === 200) {
    //   window.location.assign('/login')
    // } else if (res.status === 400) {
    //   console.log("error")
    //   window.location.assign('/signup')
    // }
  }

  return (
    <div>
      <Container fluid="sm">
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
                ></img>{' '}
                Sign up with Google
              </Button>
            </a>
            <div className="formText">or</div>
            <Form.Control
              className="loginForm"
              type="username"
              name="username"
              placeholder="Username"
              value={customerSignUp.username}
              onChange={handleChange}
              size="lg"
              required
            />
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
            <Button variant="success" bsPrefix="btn-form" type="submit" >
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
