import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function FavoriteButton({ like }) {
  return (
    <div>
      {like ? (
        <div>
          <FavoriteIcon style={{ fontSize: '35px' }} />
          add to list
        </div>
      ) : (
        <div>
          <FavoriteBorderIcon style={{ fontSize: '35px' }} />
          add to list
        </div>
      )}
    </div>
  );
}
