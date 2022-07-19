import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import * as api from '../../services/users-api';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = ({ movieId }) => {
  const { uid, token } = useSelector((state) => state.users);
  const [isFavorite, setIsFavorite] = useState(false);

  const addFavoriteMutation = useMutation(api.addFavoriteMovie);
  
  const removeFavoriteMutation = useMutation(api.removeFavoriteMovie);

  const setFavoriteHandler = () => {
    addFavoriteMutation.mutate({ userId: uid, movieId, token });
    setIsFavorite(true);
  };

  const unsetFavoriteHandler = () => {
    removeFavoriteMutation.mutate({ userId: uid, movieId, token });
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
