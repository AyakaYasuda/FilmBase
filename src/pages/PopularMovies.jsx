import React, { useState } from 'react';
import { useQuery } from 'react-query';
import fetchPopularMovies from '../services/fetchPopularMovies';

import MoviesList from '../components/Movies/MoviesList';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  const { isLoading, isFetching, isError, error } = useQuery(
    'movies',
    fetchPopularMovies,
    {
      retry: false,
      onSuccess: (data) => {
        setMovies(data.results);
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
        <p>{error}</p>
      </div>
    );
  }

  return <MoviesList movies={movies} />;
};

export default PopularMovies;
