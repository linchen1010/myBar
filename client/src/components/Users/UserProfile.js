import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Spinner, Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export default function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  const handleUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', e.target.files[0]);
    if (user) {
      const res = await axios.post(`/api/user/avatar/${user._id}`, data);
      // update user info after upload avatar image
      const updatedUser = await axios.get(`/api/current_user`);
      setUser(updatedUser.data);
      // console.log(res.data.response_data.Location);
    }
  };
  if (!user) return <Spinner />;

  return (
    <div>
      <Container fluid="sm">
        <Row className="justify-content-center">
          <div className="userProfileTitle">{user.name}'s Profile</div>
        </Row>
        <Row className="justify-content-center">
          <img
            src={user.avatar}
            alt="profile img"
            className="userProfileImg"
          ></img>
        </Row>
        <Row className="justify-content-center">
          <input
            accept="image/*"
            type="file"
            id="uploadFile"
            hidden
            required
            onChange={handleUpload}
          />
          <label
            htmlFor="uploadFile"
            className="btn-upload"
            style={{ width: '100px' }}
          >
            <PhotoCamera />
            Upload
          </label>
        </Row>
        <Row className="justify-content-center">
          <div className="userProfile">User name: {user.name}</div>
        </Row>
        <Row className="justify-content-center">
          <div className="userProfile">Email address: {user.email}</div>
        </Row>
        <Row className="justify-content-center">
          <Col sm="auto">
            <a href={`/user/favorite`}>
              <Button variant="outline-success" bsPrefix="btn-form">
                My Favorite List
              </Button>
            </a>
          </Col>
          <Col sm="auto">
            <a href={`/user/posts`}>
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
