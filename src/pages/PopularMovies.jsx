import React from 'react';
import { useQuery } from 'react-query';
import * as api from '../services/movies-api';

import MoviesList from '../components/Movies/MoviesList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './PopularMovies.module.scss';

const PopularMovies = () => {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: movies,
  } = useQuery('MOVIES', api.getAllMovies, {
    retry: false,
    initialData: [],
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className={classes['popular-movies-container']}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={classes['popular-movies-container']}>
      {movies && <MoviesList movies={movies} />};
    </div>
  );
};

export default PopularMovies;
