import React, { useState } from 'react';
import { Form, Container, Row, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FlashMessage } from 'react-flash-message';

export default function PostNew() {
  const [postData, setPostData] = useState({
    title: '',
    instruction: '',
    comment: '',
  });
  const [msg, setMsg] = useState('');

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(postData);
    const res = await axios.post('/api/user/posts/new', postData);
    console.log(res.data.message);
    setMsg(res.data.message);
    // redirect user to their post page
    setTimeout(() => window.location.assign('/user/posts'), 2000);
  };

  return (
    <div>
      <Container>
        {/* {success ? (
          <Row className="justify-content-center flashMsg">
            <FlashMessage duration={1500}>
              <Alert variant="success">{msg}</Alert>
            </FlashMessage>
          </Row>
        ) : (
          <div></div>
        )} */}
        <Row className="justify-content-center">
          <div className="userProfileTitle">Create a new post</div>
        </Row>

        <Form.Group className="postForm">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              className="postForm"
              type="title"
              name="title"
              value={postData.title}
              placeholder="Title"
              onChange={handleChange}
              required
            ></Form.Control>
            <Form.Control
              className="postForm"
              as="textarea"
              rows={3}
              name="instruction"
              value={postData.instruction}
              placeholder="Instruction"
              onChange={handleChange}
            ></Form.Control>
            <Form.Control
              className="postForm"
              as="textarea"
              rows={3}
              name="comment"
              value={postData.comment}
              placeholder="Share something about this drink : )"
              onChange={handleChange}
              required
            ></Form.Control>
            <Row className="justify-content-center">
              <input
                accept="image/*"
                type="file"
                id="uploadFile"
                hidden
                required
              />
              <label htmlFor="uploadFile" className="btn-upload">
                Upload image
              </label>
            </Row>
            <Button variant="success" bsPrefix="btn-form" type="submit">
              Submit
            </Button>
          </Form>
        </Form.Group>
      </Container>
    </div>
  );
}
