import React, { useState } from "react";
import classes from "./MoviesList.module.css";
import MovieModal from "./MovieModal";
import MovieItem from "./MovieItem";

const MoviesList = props => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [movieId, setMovieId] = useState("");

  const openModalHandler = id => {
    setModalIsShown(true);
    setMovieId(id);
  };

  const closeModalHandler = () => {
    setModalIsShown(false);
  };

  const moviesList = props.movies.map(movie => (
    <MovieItem
      key={movie.id}
      id={movie.id}
      title={movie.title}
      overview={movie.overview}
      image={movie.poster_path}
      release_date={movie.release_date}
      onOpenModal={openModalHandler}
    />
  ));

  return (
    <section className={classes.movies_list}>
      {modalIsShown && (
        <MovieModal
          movies={props.movies}
          movieId={movieId}
          onCloseModal={closeModalHandler}
        />
      )}
      <div className={classes.container}>{moviesList}</div>
      <div className={classes.spacer}></div>
    </section>
  );
};

export default MoviesList;
