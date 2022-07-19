import React from 'react';
import { useSelector } from 'react-redux';

import MoviesList from '../components/Movies/MoviesList';
import classes from './FavoriteMovies.module.css';

const FavoriteMovies = () => {
  const favoriteMovies = useSelector((state) => state.favoriteMovieArray);
  console.log(favoriteMovies);

  let mainContent = <MoviesList movies={favoriteMovies} />;
  if (favoriteMovies.length === 0) {
    mainContent = (
      <div className={classes.message}>
        <p>No favorite movies yet...</p>
      </div>
    );
  }

  return <div>{mainContent}</div>;
};

export default FavoriteMovies;
