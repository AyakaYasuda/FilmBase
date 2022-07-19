import React, { useState } from 'react';
import { useMutation } from 'react-query';
import * as api from "../../services/users-api"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const FavoriteButton = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const setFavoriteHandler = () => {
    setIsFavorite(true);
  };

  const unsetFavoriteHandler = () => {
    setIsFavorite(false);
  };
  

  return isFavorite ? (
    <FavoriteIcon
      sx={{ color: '#ffe251', fontSize: 30 }}
      onClick={unsetFavoriteHandler}
    />
  ) : (
    <FavoriteBorderIcon
      sx={{ color: '#ffe251', fontSize: 30 }}
      onClick={setFavoriteHandler}
    />
  );
};

export default FavoriteButton;
