import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import fetchPopularMovies from '../services/fetchPopularMovies';
import * as api from '../services/movies-api';

import MoviesList from '../components/Movies/MoviesList';

const PopularMovies = () => {
  const queryClient = useQueryClient();
  const { token } = useSelector((state) => state.users);

  const { isLoading, isFetching, isError, error } = useQuery(
    'MOVIES',
    fetchPopularMovies,
    {
      retry: false,
      staleTime: Infinity,
    }
  );

  const { data } = useQuery(['DB_MOVIES'], api.getAllMovies, {
    retry: false,
    staleTime: Infinity,
  });

  const moviesMutation = useMutation(api.createMovie);

  const dbMovies = queryClient.getQueryData('DB_MOVIES');
  const movies = queryClient.getQueryData('MOVIES')?.results;

  useEffect(() => {
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

        if (!dbMovies.map((dbMovie) => dbMovie.movie_id).includes(movie.id)) {
          moviesMutation.mutate({ data: movieData, token });
        }
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
