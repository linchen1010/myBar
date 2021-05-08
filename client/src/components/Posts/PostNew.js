import React from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap';
// create new post!
// title: String,
//   image: String,
//   comment: String,
//   instruction: String,
//   createDate: Date,
//   _user: { type: Schema.Types.ObjectId, ref: 'User' },
//   like: { type: Number, default: 0 },
export default function PostNew() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <div className="userProfileTitle">Create a new post</div>
        </Row>
        <Form.Group className="postForm">
          <Form.Control
            className="postForm"
            type="title"
            placeholder="Title"
          ></Form.Control>
          <Form.Control
            className="postForm"
            type="text"
            as="textarea"
            rows={3}
            placeholder="Instruction"
          ></Form.Control>
          <Form.Control
            as="textarea"
            rows={3}
            className="postForm"
            type="textarea"
            placeholder="Share something about this drink : )"
          ></Form.Control>
          <Row className="justify-content-center">
            <form
              action="/upload/photo"
              encType="multipart/form-data"
              // onInput={handleUpload}
            >
              <input accept="image/*" type="file" id="uploadFile" hidden />
              <label for="uploadFile" className="btn-upload">
                Upload image
              </label>
            </form>
          </Row>
          <Button variant="success" bsPrefix="btn-form" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Container>
    </div>
  );
}
