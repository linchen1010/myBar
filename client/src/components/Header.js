import React, { useState, useRef, useContext } from 'react';
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
  Alert,
  Container,
  Row,
} from 'react-bootstrap';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import FlashMessage from 'react-flash-message';

export default function Header() {
  const [search, setSearch] = useState('');
  const [logout, setLogout] = useState(false);
  const searchEl = useRef(null);
  // const history = useHistory();
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const loggingOut = () => {
    setLogout(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === '') alert(`search cound not be empty!`);
    else {
      // history.push(`/search?s=${search}`);
      // resend the request, will reload the page
      window.location.assign(`/search?s=${search}`);
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
          myBar
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
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
          </Nav>

          <Form inline className="mr-sm-4">
            <FormControl
              type="text"
              placeholder="Search for drinks"
              onChange={handleChange}
              ref={searchEl}
            />
            <Button
              onClick={handleSubmit}
              ref={searchEl}
              variant="outline-light"
              type="submit"
            >
              <SearchIcon />
            </Button>
          </Form>
          {user ? <Logout loggingOut={loggingOut} /> : <LoginSignUp />}
        </Navbar.Collapse>
      </Navbar>
      {logout ? (
        <Container>
          <Row className="justify-content-center">
            <FlashMessage duration={2000}>
              <Alert variant="success" className="flashMsg">
                You have been successfully logged out.
              </Alert>
            </FlashMessage>
          </Row>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// when user hasn't log in -- show Login/Signup for the users
const LoginSignUp = () => {
  return (
    <div>
      <Nav className="ml navLog">
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
const Logout = ({ loggingOut }) => {
  const { user, setUser } = useContext(UserContext);

  const logoutUser = async () => {
    await axios.get('/api/logout'); // ask server to logout user
    // loggingOut();
    // setUser(null);
    setTimeout(() => setUser(null), 2000); // set the frontend user data to null
    setTimeout(() => window.location.assign('/'), 2000);
    setTimeout(() => loggingOut(), 1000);
  };
  return (
    <Nav className="ml">
      <DropdownButton
        title={<img src={user.avatar} className="navAvatar"></img>}
        menuAlign="right"
        bsPrefix="navDropdown"
      >
        <Dropdown.Item href="/user" className="navLog">
          My Profile
        </Dropdown.Item>
        <Dropdown.Item href="/user/favorite" className="navLog">
          My Favorite List
        </Dropdown.Item>
        <Dropdown.Item href="/user/posts" className="navLog">
          My Post
        </Dropdown.Item>
        <Dropdown.Item className="navLog" onClick={() => logoutUser()}>
          Logout
        </Dropdown.Item>
      </DropdownButton>
    </Nav>
  );
};
