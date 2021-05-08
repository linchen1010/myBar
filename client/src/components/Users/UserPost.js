import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function UserPost() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <div className="userProfileTitle">My Posts</div>
        </Row>

        <Row className="justify-content-center">
          {user ? (
            <a href={`/user/${user._id}/post/new`}>
              <Button bsPrefix="btn-random">add new post</Button>
            </a>
          ) : (
            <div></div>
          )}
        </Row>
      </Container>
    </div>
  );
}
