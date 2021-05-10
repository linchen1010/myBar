import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  CardColumns,
} from 'react-bootstrap';
import axios from 'axios';
import PostItem from '../Posts/PostItem';
import AddIcon from '@material-ui/icons/Add';

export default function UserPost() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([{}]);
  const fetchPosts = async () => {
    const res = await axios.get('/api/user/posts');
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
      <Container fluid="md">
        <Row className="justify-content-center">
          <div className="userProfileTitle">My Posts</div>
        </Row>

        <Row className="justify-content-center">
          {user ? (
            <div>
              <a href={`/user/posts/new`}>
                {/* <Button bsPrefix="btn-random">add new post</Button> */}
                <AddIcon
                  color="inherit"
                  className="addIcon"
                  style={{ fontSize: '80px' }}
                />
              </a>
              <div
                style={{
                  color: '#343a40',
                  fontSize: '30px',
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                new
              </div>
            </div>
          ) : (
            <div></div>
          )}
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
                <PostItem
                  key={i}
                  title={post.title}
                  image="https://images.unsplash.com/photo-1594487984147-3389bcee5078?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
                  createDate={post.lastEdit}
                  postId={post._id}
                />
              ))}
            </CardColumns>
          </Row>
        )}
      </Container>
    </div>
  );
}
