import React from 'react';
import Modal from '../UI/Modal';
import FavoriteButton from '../UI/FavoriteButton';
import WatchButton from '../UI/WatchButton';
import classes from './MovieModal.module.css';

const MovieModal = ({ movie, onCloseModal }) => {
  const imageLargePath =
    'https://image.tmdb.org/t/p/w300' + (movie.image_path || movie.poster_path);

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className={classes.wrapper}>
        <div className={classes.image}>
          <img src={imageLargePath} alt={movie.title} />
        </div>
        <div className={classes.description}>
          <div>
            <h1 className={classes.title}>{movie.title}</h1>
            <span className={classes['line-spacer']}></span>
            <div className={classes['description-flex']}>
              <h1>Overview</h1>
              <p>{movie.overview}</p>
            </div>
            <span className={classes.spacer}></span>
            <div className={classes['description-flex']}>
              <h1>Release Date</h1>
              <p>{movie.release_date}</p>
            </div>
          </div>
          <span className={classes['line-spacer']}></span>
          <div className={classes.boxes}>
            <p className={classes.rate}>{movie.vote_average} / 10</p>
            <div className={classes.buttons}>
              <FavoriteButton movieId={movie.id || movie.movie_id} />
              <WatchButton />
            </div>
          </div>
        </div>
        <button className={classes['review-button']}>Log Film</button>
      </div>
    </Modal>
  );
};

export default MovieModal;
