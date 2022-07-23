import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/users-api';

import useUser from '../hooks/useUser';
import useError from '../hooks/useError';

import ErrorMessage from '../components/UI/ErrorMessage';
import MoviesList from '../components/Movies/MoviesList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoDataMessage from '../components/UI/NoDataMessage';
import classes from './FavoriteMovies.module.scss';

const FavoriteMovies = () => {
  const { uid, token } = useSelector((state) => state.users);
  const { favoriteMoviesIdArr } = useUser();
  const { message, status, resetErrorHandler, setErrorHandler } = useError();

  const {
    isError,
    isLoading,
    isFetching,
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
      onError: (err) => {
        setErrorHandler(err.response.data.errors.message, err.response.status);
      },
    }
  );

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (!isError && movies.length === 0) {
    return <NoDataMessage>No favorite movies yet...</NoDataMessage>;
  }

  return (
    <>
      {message && status && (
        <ErrorMessage
          message={message}
          status={status}
          onClick={resetErrorHandler}
        />
      )}
      <div
        className={classes['favorite-movies-container']}
        onClick={resetErrorHandler}
      >
        {movies && <MoviesList movies={movies} />}
      </div>
    </>
  );
};

export default FavoriteMovies;
