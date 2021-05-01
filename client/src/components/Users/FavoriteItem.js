import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FavoriteItem({ drinkId, drinkName, drinkImgURL }) {
  const [removed, setRemoved] = useState(false);
  const { id } = useParams();
  const removeDrink = async () => {
    const res = await axios.delete(`/api/user/${id}/favorite/${drinkId}`);
    setRemoved(true);
    console.log(res);
  };

  if (removed) return <div></div>;
  return (
    <div>
      <Card
        className="text-center"
        border="light"
        style={{ width: '14rem', marginTop: '40px' }}
      >
        <Card.Img variant="top" src={drinkImgURL} />
        <Card.Body>
          <Card.Title>{drinkName}</Card.Title>
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
