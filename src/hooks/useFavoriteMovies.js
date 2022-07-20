import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/users-api';

const useFavoriteMovies = () => {
  const { uid, token } = useSelector((state) => state.users);
  const [favoriteMoviesIdArr, setFavoriteMoviesIdArr] = useState([]);

  const { data: user } = useQuery(
    ['USER', uid],
    () => api.getUserById({ id: uid, token }),
    {
      enabled: !!uid,
      onSuccess: (data) => {
        setFavoriteMoviesIdArr(data.favorite_movies);
      },
    }
  );

  return { favoriteMoviesIdArr, user };
};

export default useFavoriteMovies;
