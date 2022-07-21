import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/users-api';
import useUser from '../../hooks/useUser';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = ({ movieId }) => {
  const { uid, token } = useSelector((state) => state.users);
  const { favoriteMoviesIdArr } = useUser();
  const [isFavorite, setIsFavorite] = useState();
  const queryClient = useQueryClient();

  const addFavoriteMutation = useMutation(api.addFavoriteMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries(['USER', uid]);
      queryClient.invalidateQueries([
        'FAVORITE_MOVIES',
        uid,
        favoriteMoviesIdArr,
      ]);
    },
  });

  const removeFavoriteMutation = useMutation(api.removeFavoriteMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries(['USER', uid]);
      queryClient.invalidateQueries([
        'FAVORITE_MOVIES',
        uid,
        favoriteMoviesIdArr,
      ]);
    },
  });

  const setFavoriteHandler = () => {
    addFavoriteMutation.mutate({ userId: uid, movieId, token });
    setIsFavorite(true);
  };

  const unsetFavoriteHandler = () => {
    removeFavoriteMutation.mutate({ userId: uid, movieId, token });
    setIsFavorite(false);
  };

  useEffect(() => {
    setIsFavorite(favoriteMoviesIdArr?.includes(movieId));
  }, [favoriteMoviesIdArr, movieId]);

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
