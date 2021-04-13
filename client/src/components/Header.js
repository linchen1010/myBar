import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="myNavbar">
        <Navbar.Brand href="/" to="/">
          <LocalBarIcon color="inherit" fontSize="large" />
          myBestBar
        </Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>

          {/* <Nav.Link href="#">Pricing</Nav.Link> */}
        </Nav>
        <Nav className="ml">
          <Nav.Link as={Link} to="/login">
            Log in
          </Nav.Link>
        </Nav>
        <Nav className="ml">
          <Nav.Link as={Link} to="/signup">
            Sign up
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
