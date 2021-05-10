import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import {
  Container,
  Row,
  Spinner,
  Card,
  Button,
  Form,
  Alert,
} from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import FlashMessage from 'react-flash-message';

export default function Post() {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  //   const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [instruction, setInstruction] = useState('');
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    if (e.target.name == 'title') setTitle(e.target.value);
    else if (e.target.name == 'instruction') setInstruction(e.target.value);
    else if (e.target.name == 'comment') setComment(e.target.value);
  };
  const { postId } = useParams();

  const fetchPost = async () => {
    const res = await axios.get(`/api/user/posts/${postId}`);
    console.log(res.data);
    setPost(res.data);
    setTitle(res.data.title);
    setInstruction(res.data.instruction);
    setComment(res.data.comment);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const data = { title, instruction, comment };
    const res = await axios.post(`/api/user/posts/${postId}`, data);
    if (res.data.message) {
      setMsg(res.data.message);
    }
    setTimeout(() => window.location.assign(`/user/posts/${postId}`), 1500);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (post.length === 0)
    return (
      <Container>
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      </Container>
    );

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
        <Row className="justify-content-center" style={{ marginTop: '30px' }}>
          <a href={`/user/posts/${postId}`}>
            <Button bsPrefix="btn-random">Go back</Button>
          </a>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: '30px' }}>
          <Card className="text-center" style={{ width: '40rem' }}>
            <Form>
              <Card.Img variant="top" src={post.image} />
              <Card.Header style={{ fontSize: '40px', fontWeight: '700' }}>
                Title
                <Form.Control
                  className="postForm"
                  type="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  required
                ></Form.Control>
              </Card.Header>
              <Card.Body>
                <Card.Title
                  className="detailTitle"
                  style={{
                    fontSize: '30px',
                    fontWeight: '700',
                    marginBottom: '0px',
                  }}
                >
                  Instruction
                </Card.Title>
                <Form.Control
                  className="postForm"
                  as="textarea"
                  rows={3}
                  name="instruction"
                  value={instruction}
                  onChange={handleChange}
                ></Form.Control>
                <hr></hr>

                <Card.Title
                  className="detailTitle"
                  style={{
                    fontSize: '30px',
                    fontWeight: '700',
                    marginBottom: '0px',
                  }}
                >
                  Something about this drink
                </Card.Title>
                <Form.Control
                  className="postForm"
                  type="title"
                  name="title"
                  value={comment}
                  as="textarea"
                  rows={3}
                  name="comment"
                  onChange={handleChange}
                  required
                ></Form.Control>
                {user && user._id == post._user ? (
                  <div>
                    <Button
                      bsPrefix="btn-moreInfo"
                      style={{
                        fontSize: '20px',
                        border: '4px solid rgb(0, 140, 255)',
                        width: '30%',
                      }}
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </Card.Body>
            </Form>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
