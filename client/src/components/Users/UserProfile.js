import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Spinner, Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

export default function UserProfile() {
  const [uploadFile, setuploadFile] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const handleChange = (event) => {
    setuploadFile(event.target.files[0])
  }

  const handleUpload = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", uploadFile)
    console.log(uploadFile)
    console.log(data)
    const res = await axios.post(`/api/imageUpload/${id}`, data);
    console.log(res.data.response_data.Location);
  }
  if (!user) return <Spinner />;

  return (
    <div>
      <Container fluid="sm">
        <Row className="justify-content-center">
          <div className="userProfileTitle">{user.name}'s Profile</div>
        </Row>
        <Row className="justify-content-center">
          <div className="userImg">
            <img
              src={user.avatar}
              alt="profile img"
              className="userProfileImg"
            ></img>
            <div className="middle">
              <form action="/upload/photo" enctype="multipart/form-data" onInput={handleUpload}  >
                <input accept="image/*" id="icon-button-file"
                  type="file" name="file" style={{ display: 'none' }} onChange={handleChange} />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture"
                    component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              </form>

            </div>
          </div>
          {/* <input type="file" name='file' /> */}
        </Row>
        <Row className="justify-content-center">
          <div className="userProfile">User name: {user.name}</div>
        </Row>
        <Row className="justify-content-center">
          <div className="userProfile">Email address: {user.email}</div>
        </Row>
        <Row className="justify-content-center">
          <Col sm="auto">
            <Button variant="outline-success" bsPrefix="btn-form">
              Edit Profile
            </Button>
          </Col>
          <Col sm="auto">
            <a href={`/user/${user._id}/favorite`}>
              <Button variant="outline-success" bsPrefix="btn-form">
                My Favorite List
              </Button>
            </a>
          </Col>
          <Col sm="auto">
            <a href={`/user/${user._id}/post`}>
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
