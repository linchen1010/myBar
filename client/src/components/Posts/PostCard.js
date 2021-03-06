import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostCard({
  title,
  image,
  userName,
  createDate,
  postId,
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Card
        className="text-center"
        border="dark"
        style={{ width: '20rem', marginTop: '40px' }}
      >
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>
            <div
              style={{
                fontSize: '30px',
                fontWeight: '600',
                color: 'rgb(59,59,59)',
                fontFamily: 'Trebuchet MS',
              }}
            >
              {title}
            </div>
          </Card.Title>
          <a href={`/user/posts/${postId}`}>
            <Button bsPrefix="btn-moreInfo" style={{ fontSize: '18px' }}>
              View post
            </Button>
          </a>
        </Card.Body>
        <Card.Footer className="text-muted">
          <footer className="blockquote-footer">
            <small className="text-muted">Posted by {userName}</small>
          </footer>
          Last updated: {createDate}
        </Card.Footer>
      </Card>
    </div>
  );
}
