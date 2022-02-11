import React from "react";
import Modal from "../UI/Modal";
import FavoriteButton from "../UI/FavoriteButton";
import WatchButton from "../UI/WatchButton";
import classes from "./MovieModal.module.css";

const MovieModal = props => {
  const selectedMovieArray = props.movies.filter(
    movie => movie.id === props.movieId
  );
  const selectedMovie = selectedMovieArray[0];

  if (!selectedMovie) {
    return <div></div>;
  }

  const imageLargePath =
    "https://image.tmdb.org/t/p/w300" + selectedMovie.poster_path;

  return (
    <Modal onCloseModal={props.onCloseModal}>
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img src={imageLargePath} alt={selectedMovie.title} />
        </div>
        <div className={classes.description}>
          <div>
            <h1 className={classes.title}>{selectedMovie.title}</h1>
            <span className={classes.line_spacer}></span>
            <div className={classes.description_flex}>
              <h1>Overview</h1>
              <p>{selectedMovie.overview}</p>
            </div>
            <span className={classes.spacer}></span>
            <div className={classes.description_flex}>
              <h1>Release Date</h1>
              <p>{selectedMovie.release_date}</p>
            </div>
          </div>
          <span className={classes.line_spacer}></span>
          <div className={classes.boxes}>
            <p className={classes.rate}>{selectedMovie.vote_average} / 10</p>
            <div className={classes.buttons}>
              <FavoriteButton selectedMovie={selectedMovie} />
              <WatchButton />
            </div>
          </div>
        </div>
        <button className={classes.review_button}>Log Film</button>
      </div>
    </Modal>
  );
};

export default MovieModal;
