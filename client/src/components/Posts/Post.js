import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Container, Row, Spinner } from 'react-bootstrap';

export default function Post() {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  const fetchPost = async () => {
    const res = await axios.get(`/api/user/posts/${postId}`);
    setPost(res.data);
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
      <h1>{post.title}</h1>
    </div>
  );
}
