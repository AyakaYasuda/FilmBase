import React from 'react';
import { useQuery } from 'react-query';
import * as api from '../services/movies-api';
import useError from '../hooks/useError';

import MoviesList from '../components/Movies/MoviesList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import classes from './PopularMovies.module.scss';

const PopularMovies = () => {
  const { message, status, resetErrorHandler, setErrorHandler } = useError();

  const {
    isLoading,
    isFetching,
    data: movies,
  } = useQuery('MOVIES', api.getAllMovies, {
    retry: false,
    initialData: [],
    onError: (err) => {
      setErrorHandler(err.response.data.errors.message, err.response.status);
    },
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
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
        className={classes['popular-movies-container']}
        onClick={resetErrorHandler}
      >
        {movies && <MoviesList movies={movies} />}
      </div>
    </>
  );
};

export default PopularMovies;
