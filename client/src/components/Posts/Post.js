import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Row, Spinner, Card, Button, Alert } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import FlashMessage from 'react-flash-message';
import { useHistory } from 'react-router-dom';
import GoBackButton from '../utils/GoBackButton';

export default function Post() {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [msg, setMsg] = useState('');
  const history = useHistory();
  const fetchPost = async () => {
    const res = await axios.get(`/api/user/posts/${postId}`);
    console.log(res.data);
    setPost(res.data);
  };

  const removeDrink = async () => {
    const res = await axios.delete(`/api/user/posts/${postId}`);
    if (res.data.message) {
      setMsg(res.data.message);
    }
    setTimeout(() => window.location.assign('/user/posts'), 2000);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (post.length == 0)
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
          <GoBackButton />
        </Row>
        <Row className="justify-content-center" style={{ marginTop: '20px' }}>
          <Card className="text-center" style={{ width: '40rem' }}>
            <Card.Img variant="top" src={post.image} />
            <Card.Header
              style={{
                fontSize: '40px',
                fontWeight: '700',
                fontFamily: 'Trebuchet MS',
              }}
            >
              {post.title}
            </Card.Header>
            <Card.Body>
              {post.instruction ? (
                <div>
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
                  <Card.Text className="postContent">
                    {post.instruction}
                  </Card.Text>
                  <hr></hr>
                </div>
              ) : (
                <div></div>
              )}

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
              <Card.Text className="postContent">{post.comment}</Card.Text>
              {user && user._id === post._user ? (
                <div>
                  <a href={`/user/posts/${post._id}/edit`}>
                    <Button bsPrefix="btn-edit">Edit</Button>
                  </a>
                  <Button
                    bsPrefix="btn-remove"
                    style={{ fontSize: '20px', border: '4px solid red' }}
                    onClick={() => removeDrink()}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}
