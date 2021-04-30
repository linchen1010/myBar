import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';

export default function Footer() {
  const style = {
    color: 'white',
  };
  return (
    <div className="footer">
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center myNavbar">
          <Nav.Link href="/" to="/" style={style}>
            <LocalBarIcon color="inherit" fontSize="large" /> MyBestBar
          </Nav.Link>
          <Nav style={style}> © 2021 </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
