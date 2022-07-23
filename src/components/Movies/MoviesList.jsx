import React, { useState, useEffect } from 'react';

import MovieModalMobile from './MovieModalMobile';
import MovieModalDesktop from './MovieModalDesktop';
import MovieItem from './MovieItem';
import classes from './MoviesList.module.scss';

const MoviesList = ({ movies }) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [movieId, setMovieId] = useState();
  const [selectedMovie, setSelectedMovie] = useState();

  const openModalHandler = (id) => {
    setModalIsShown(true);
    setMovieId(id);
  };

  const closeModalHandler = () => {
    setModalIsShown(false);
  };

  useEffect(() => {
    if (movieId) {
      const selectedMovieArray = movies.filter(
        (movie) => (movie.id || movie.movie_id) === movieId
      );
      setSelectedMovie(selectedMovieArray[0]);
    }
  }, [movieId, movies]);

  return (
    <>
      {modalIsShown && selectedMovie && (
        <>
          <MovieModalMobile
            movie={selectedMovie}
            onCloseModal={closeModalHandler}
            className={classes["movie-modal-mobile"]}
          />
          <MovieModalDesktop
            movie={selectedMovie}
            onCloseModal={closeModalHandler}
            className={classes["movie-modal-desktop"]}
          />
        </>
      )}

      <div className={classes['movies-list']}>
        {movies.length !== 0 &&
          movies.map((movie) => (
            <MovieItem
              key={movie.id || movie.movie_id}
              id={movie.id || movie.movie_id}
              title={movie.title}
              overview={movie.overview}
              image={movie.poster_path || movie.image_path}
              release_date={movie.release_date}
              onOpenModal={openModalHandler}
            />
          ))}
      </div>
    </>
  );
};

export default MoviesList;
