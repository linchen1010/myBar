import React from 'react';
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';

export default function Footer() {
  return (
    <div className="footer">
      <Navbar bg="dark" variant="dark">
        <Container className="myNavbar justify-content-center">
          <NavbarBrand href="/" to="/">
            <LocalBarIcon color="inherit" fontSize="large" /> MyBestBar
          </NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}
