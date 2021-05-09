import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostItem({
  postId,
  title,
  image,
  comment,
  instruction,
  createDate,
}) {
  //   const removeDrink = async () => {
  //     const res = await axios.delete(`/api/user/favorite/${drinkId}`);
  //     console.log(res.data);
  //   };

  return (
    <div style={{ textAlign: 'center' }}>
      <Card
        className="text-center"
        border="dark"
        style={{ width: '16rem', marginTop: '40px' }}
      >
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>
            <div
              style={{
                fontSize: '25px',
                fontWeight: '600',
                color: 'rgb(59,59,59)',
                fontFamily: 'Trebuchet MS',
              }}
            >
              {title}
            </div>
          </Card.Title>
          <a href={`/user/posts/${postId}`}>
            <Button bsPrefix="btn-moreInfo">View post</Button>
          </a>
        </Card.Body>
        <Card.Footer className="text-muted">
          Last updated: {createDate}
        </Card.Footer>
      </Card>
    </div>
  );
}
