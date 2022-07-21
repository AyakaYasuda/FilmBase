import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/users-api';

import useUser from '../hooks/useUser';

import MoviesList from '../components/Movies/MoviesList';
// import classes from './FavoriteMovies.module.css';

const FavoriteMovies = () => {
  const { uid, token } = useSelector((state) => state.users);
  const { favoriteMoviesIdArr } = useUser();

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: movies,
  } = useQuery(
    ['FAVORITE_MOVIES', uid, favoriteMoviesIdArr],
    () =>
      api.getFavoriteMovies({
        userId: uid,
        favoriteMoviesId: favoriteMoviesIdArr,
        token,
      }),
    {
      retry: false,
      initialData: [],
      enabled: Boolean(favoriteMoviesIdArr?.length !== 0),
    }
  );

  if (isLoading || isFetching) {
    return (
      <div className="section-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="section-container">
        <p>{error.message}</p>
      </div>
    );
  }

  return movies && <MoviesList movies={movies} />;
};

export default FavoriteMovies;
