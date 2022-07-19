import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as usersApi from '../services/users-api';
import * as moviesApi from '../services/movies-api';

import useFavoriteMovies from '../hooks/useFavoriteMovies';

import MoviesList from '../components/Movies/MoviesList';
// import classes from './FavoriteMovies.module.css';

const FavoriteMovies = () => {
  const { favoriteMoviesIdArr } = useFavoriteMovies();
  const [movies, setMovies] = useState([]);

  let favoriteMovies = [];
  // const { isRefetching, error, isError } = useQuery(
  //   'DB_MOVIES',
  //   moviesApi.getAllMovies,
  //   {
  //     retry: false,
  //     refetchOnMount: true,
  //     onSuccess: (data) => {
  //       favoriteMoviesIdArr.forEach((id) => {
  //         favoriteMovies.push(data.find((movie) => movie.movie_id === id));
  //         setMovies(favoriteMovies);
  //       });
  //     },
  //   }
  // );

  // if (userIsLoading || isRefetching) {
  //   return (
  //     <div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  // if (userIsError || isError) {
  //   return (
  //     <div>
  //       <p>{userError || error}</p>
  //     </div>
  //   );
  // }

  return <MoviesList movies={movies} />;
};

export default FavoriteMovies;
