import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/users-api';

import useFavoriteMovies from '../hooks/useFavoriteMovies';

import MoviesList from '../components/Movies/MoviesList';
// import classes from './FavoriteMovies.module.css';

const FavoriteMovies = () => {
  const { uid, token } = useSelector((state) => state.users);
  const { favoriteMoviesIdArr } = useFavoriteMovies();
  const [movies, setMovies] = useState([]);

  const { isLoading, isFetching, isError, error } = useQuery(
    ['FAVORITE_MOVIES', uid, favoriteMoviesIdArr],
    () =>
      api.getFavoriteMovies({
        userId: uid,
        favoriteMoviesId: favoriteMoviesIdArr,
        token,
      }),
    {
      retry: false,
      enabled: Boolean(favoriteMoviesIdArr?.length !== 0),
      onSuccess: (data) => {
        setMovies(data);
      },
    }
  );

  if (isLoading || isFetching) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    );
  }

  return movies && <MoviesList movies={movies} />;
};

export default FavoriteMovies;
