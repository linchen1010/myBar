import React, { useState } from 'react';
import { Form, Container, Row, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import FlashMessage from 'react-flash-message';

export default function PostNew() {
  const [postData, setPostData] = useState({
    title: '',
    instruction: '',
    comment: '',
  });
  const [msg, setMsg] = useState('');
  const [uploadImg, setUploadImg] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');
  const onFileChange = (e) => {
    setUploadImg(e.target.files[0]);
    setUploadMsg('Successfully uploaded the image!');
  };

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('file', uploadImg);
    formData.append('title', postData.title);
    formData.append('instruction', postData.instruction);
    formData.append('comment', postData.comment);

    const res = await axios.post('/api/user/posts/new', formData);

    if (res.data.message) {
      setMsg(res.data.message);
      setTimeout(() => window.location.assign('/user/posts'), 2000);
    }
  };

  return (
    <div>
      <Container>
        {msg.length > 0 ? (
          <Row className="justify-content-center flashMsg">
            <FlashMessage duration={1500}>
              <Alert variant="success">{msg}</Alert>
            </FlashMessage>
          </Row>
        ) : (
          <div></div>
        )}
        {uploadMsg.length > 0 ? (
          <Row className="justify-content-center flashMsg">
            <FlashMessage duration={1000}>
              <Alert variant="success">{uploadMsg}</Alert>
            </FlashMessage>
          </Row>
        ) : (
          <div></div>
        )}
        <Row className="justify-content-center">
          <div className="userProfileTitle">Create a new post</div>
        </Row>

        <Form.Group className="postForm">
          <Form onSubmit={handleSubmit} noValidate>
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
              as="textarea"
              rows={3}
              name="instruction"
              value={postData.instruction}
              placeholder="Instruction"
              onChange={handleChange}
            ></Form.Control>
            <Form.Text className="text-muted" style={{ fontSize: '12px' }}>
              If you just want to share something, then instruction is not
              required: )
            </Form.Text>
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
                onChange={onFileChange}
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
