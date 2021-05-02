import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Spinner, Container, Row, Col, Button } from 'react-bootstrap';

export default function UserProfile() {
  const { user } = useContext(UserContext);
  if (!user) return <Spinner />;
  return (
    <div>
      <Container fluid="sm">
        <Row className="justify-content-center">
          <div className="userProfileTitle">{user.name}'s Profile</div>
        </Row>
        <Row className="justify-content-center">
          <img
            src="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
            alt="profile img"
            className="userProfileImg"
          ></img>
        </Row>
        <Row className="justify-content-center">
          <div className="userProfile">User name: {user.name}</div>
        </Row>
        <Row className="justify-content-center">
          <div className="userProfile">Email address: {user.email}</div>
        </Row>
        <Row className="justify-content-center">
          <Col sm="auto">
            <Button variant="outline-success" bsPrefix="btn-form">
              Edit Profile
            </Button>
          </Col>
          <Col sm="auto">
            <a href={`/user/${user._id}/favorite`}>
              <Button variant="outline-success" bsPrefix="btn-form">
                My Favorite List
              </Button>
            </a>
          </Col>
          <Col sm="auto">
            <a href={`/user/${user._id}/post`}>
              <Button variant="outline-success" bsPrefix="btn-form">
                My Post
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
