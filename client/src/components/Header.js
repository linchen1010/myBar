import React, { useState, useRef, useContext } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SearchIcon from '@material-ui/icons/Search';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';

export default function Header() {
  const [search, setSearch] = useState('');
  const searchEl = useRef(null);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === '') alert(`search cound not be empty!`);
    else {
      history.push(`/search?s=${search}`);
      console.log(search);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (search === '') alert(`search cound not be empty!`);
      else {
        handleSubmit();
      }
    }
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        className="myNavbar"
      >
        <Navbar.Brand href="/" to="/">
          <LocalBarIcon color="inherit" fontSize="large" />
          myBestBar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/drinks">
              Drinks
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
              onKeyPress={handleKeyDown}
              // onSubmit={handleKeyDown}
              ref={searchEl}
            />
            <Button
              onClick={handleSubmit}
              ref={searchEl}
              variant="outline-light"
            >
              <SearchIcon />
            </Button>
          </Form>
          {user ? <Logout /> : <LoginSignUp />}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

// when user hasn't log in -- show Login/Signup for the users
const LoginSignUp = () => {
  return (
    <div>
      <Nav className="ml">
        <Nav.Link as={Link} to="/login">
          Log in
        </Nav.Link>
        <Nav.Link as={Link} to="/signup">
          Sign up
        </Nav.Link>
      </Nav>
    </div>
  );
};

// when user sign in -- show logout element and log out the user
const Logout = () => {
  const { user, setUser } = useContext(UserContext);
  const logoutUser = async () => {
    await axios.get('/api/logout'); // ask server to logout user
    await setTimeout(() => setUser(null), 1200); // set the frontend user data to null
  };
  return (
    <div>
      <Nav className="ml">
        <Nav.Link as={Link} to="/" onClick={() => logoutUser()}>
          Log out
        </Nav.Link>
      </Nav>
    </div>
  );
};
