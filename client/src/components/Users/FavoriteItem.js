import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FavoriteItem({
  drinkId,
  drinkName,
  drinkImgURL,
  detectRemoved,
}) {
  const removeDrink = async () => {
    const res = await axios.delete(`/api/user/favorite/${drinkId}`);
    detectRemoved();
  };

  return (
    <div>
      <Card
        className="text-center"
        border="dark"
        style={{ width: '16rem', marginTop: '40px' }}
      >
        <Card.Img variant="top" src={drinkImgURL} />
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
              {drinkName}
            </div>
          </Card.Title>
          <a href={`/cocktails/${drinkId}`}>
            <Button bsPrefix="btn-moreInfo">More info</Button>
          </a>
          <Button bsPrefix="btn-remove" onClick={() => removeDrink()}>
            Remove
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
