import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Spinner, CardColumns } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import PostCard from './PostCard';

export default function Posts() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([{}]);
  const fetchPosts = async () => {
    const res = await axios.get('/api/posts');
    setPosts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  if (!user)
    return (
      <Container>
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      </Container>
    );
  return (
    <div>
      <Container fuild="md">
        <Row className="justify-content-center">
          <div className="userProfileTitle">User Posts</div>
        </Row>
        {!posts ? (
          <Row className="m-auto">
            <Col>
              <Spinner animation="border" />
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center">
            <CardColumns>
              {posts.map((post, i) => (
                <PostCard
                  key={i}
                  title={post.title}
                  image="https://images.unsplash.com/photo-1594487984147-3389bcee5078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
                  createDate={post.lastEdit}
                  postId={post._id}
                  userName={post.createdBy}
                />
              ))}
            </CardColumns>
          </Row>
        )}
      </Container>
    </div>
  );
}
