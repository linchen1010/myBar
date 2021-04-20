import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';

export default function Header() {
  const [search, setSearch] = useState('');

  const history = useHistory();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?s=${search}`);
    // history.push('/cocktails/17268');
    console.log(search);
  };

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

        <Form inline className="mr-sm-4">
          <FormControl
            type="text"
            placeholder="Search for drinks"
            onChange={handleChange}
          />
          <Button onClick={handleSubmit} variant="outline-light">
            <SearchIcon />
          </Button>
        </Form>

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
