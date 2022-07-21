import React from 'react';
import { useQuery } from 'react-query';
import * as api from '../services/movies-api';

import MoviesList from '../components/Movies/MoviesList';

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
    return (
      <div className="section-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="section-container">
        <p>{error}</p>
      </div>
    );
  }

  return movies && <MoviesList movies={movies} />;
};

export default PopularMovies;
