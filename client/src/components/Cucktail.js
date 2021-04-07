import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
export default function Cucktail(props) {
  const [cucktail, setCucktail] = useState({});

  // fetch Cocktail
  const fetchCocktail = async () => {
    const res = await axios.get('http://localhost:5000');
    setCucktail(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchCocktail();
  }, []);
  return (
    <div className="cucktail">
      <Container>
        <img src={cucktail.imageURL} alt="" className="img" />
        <h6>{cucktail.name}</h6>
      </Container>
    </div>
  );
}
