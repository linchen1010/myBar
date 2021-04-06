import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';

export default function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="myNavbar">
        <Navbar.Brand href="#index">
          <LocalBarIcon color="white" fontSize="large" />
          myBestBar
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#category">Category</Nav.Link>
          {/* <Nav.Link href="#">Pricing</Nav.Link> */}
        </Nav>
      </Navbar>
    </div>
  );
}
