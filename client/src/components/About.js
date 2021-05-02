import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
export default function About() {
  return (
    <div>
      <Container>
        <img
          className="aboutPageImg"
          src="https://images.unsplash.com/photo-1436076863939-06870fe779c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        ></img>
        <div className="cocktailDetailName">About myBar</div>
        <div className="aboutPageDescription">
          Have you ever spent time figuring out how to make the cocktails or
          just looking at the menu in the bar and don't know what to get?
        </div>
        <div className="aboutPageDescription">
          Or perhaps, you just want to be the person who can introduce and order
          the drinks for your friends in the bar
        </div>
        <div className="aboutPageDescription" style={{ marginBottom: '10px' }}>
          <strong>myBar </strong>is here to help you to{' '}
          <strong>explore </strong> and
          <strong> make</strong> different drinks
        </div>
        <Row className="justify-content-center">
          <div className="cocktailDetailName">How to use myBar?</div>
        </Row>
        <div className="aboutPageDescription" style={{ marginBottom: '10px' }}>
          Check different recipes of drinks and make them by yourserlf
        </div>
        <div className="aboutPageDescription" style={{ marginBottom: '10px' }}>
          Recipes include all the things you should know to make a good drink
        </div>
        <Row className="justify-content-center">
          <div className="cocktailDetailName">Not just recipe</div>
        </Row>
        <div className="aboutPageDescription" style={{ marginBottom: '10px' }}>
          Sign up to utilize more features in <strong>myBar</strong>
        </div>
        <div className="aboutPageDescription" style={{ marginBottom: '10px' }}>
          As a user, you could add drinks to your own favorite list and share
          drinks to others
        </div>
        <Row className="justify-content-center">
          <div className="cocktailDetailName">Finally</div>
        </Row>
        <div className="aboutPageDescription" style={{ marginBottom: '10px' }}>
          Enjoy your wonderful journey in <strong>myBar</strong>, Cheers!
        </div>
      </Container>
    </div>
  );
}
