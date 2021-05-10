import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
export default function GoBackButton() {
  const history = useHistory();
  return (
    <Button bsPrefix="btn-random" onClick={() => history.goBack()}>
      Go back
    </Button>
  );
}
