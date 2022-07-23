import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/users-api';

import useUser from '../hooks/useUser';

import MoviesList from '../components/Movies/MoviesList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoDataMessage from '../components/UI/NoDataMessage';
import classes from './FavoriteMovies.module.scss';

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
    return <LoadingSpinner />;
  }

  // FIXME: error handling
  if (isError) {
    return (
      <div className={classes['favorite-movies-container']}>
        <p>{error.message}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return <NoDataMessage>No favorite movies yet...</NoDataMessage>;
  }

  return (
    <div className={classes['favorite-movies-container']}>
      {movies && <MoviesList movies={movies} />}
    </div>
  );
};

export default FavoriteMovies;
