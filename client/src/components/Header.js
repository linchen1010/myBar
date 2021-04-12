import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="myNavbar">
        <Link to="/">
          <Navbar.Brand href="/">
            <LocalBarIcon color="inherit" fontSize="large" />
            myBestBar
          </Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          <Link to="/">
            <Nav.Link href="/">Home</Nav.Link>
          </Link>
          {/* <Link to="/">
            <Nav.Link href="/category">Category</Nav.Link>
          </Link> */}
          <Link to="/about">
            <Nav.Link href="/about">About</Nav.Link>
          </Link>

          {/* <Nav.Link href="#">Pricing</Nav.Link> */}
        </Nav>
        <Nav className="ml-auto">
          <Link to="/signup">
            <Nav.Link href="/signup">Sign up</Nav.Link>
          </Link>
        </Nav>
      </Navbar>
    </div>
  );
}
