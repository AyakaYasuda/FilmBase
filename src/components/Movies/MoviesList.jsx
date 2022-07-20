import React, { useState, useEffect } from 'react';
import classes from './MoviesList.module.css';
import MovieModal from './MovieModal';
import MovieItem from './MovieItem';

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
    <section className={classes['movies-list']}>
      {modalIsShown && selectedMovie && (
        <MovieModal movie={selectedMovie} onCloseModal={closeModalHandler} />
      )}
      <div className={classes.container}>
        {movies.map((movie) => (
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
    </section>
  );
};

export default MoviesList;
