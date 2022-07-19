import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import fetchPopularMovies from '../services/fetchPopularMovies';
import * as api from '../services/movies-api';

import MoviesList from '../components/Movies/MoviesList';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const { token } = useSelector((state) => state.users);

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

  const moviesMutation = useMutation(api.createMovie);

  useEffect(() => {
    console.log('token', token);
    if (movies && token) {
      movies.forEach((movie) => {
        const movieData = {
          id: movie.id,
          imagePath: movie.poster_path,
          title: movie.title,
          overview: movie.overview,
          releaseDate: movie.release_date,
          vote: movie.vote_average,
        };
        moviesMutation.mutate({ data: movieData, token });
      });
    }
  }, [movies, token]);

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
