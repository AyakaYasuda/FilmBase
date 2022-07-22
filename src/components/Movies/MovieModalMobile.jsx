import React from 'react';
import Modal from '../UI/Modal';
import FavoriteButton from './FavoriteButton';
import ReviewButton from '../Reviews/ReviewButton';
import classes from './MovieModalMobile.module.scss';

const MovieModalMobile = ({ movie, onCloseModal }) => {
  const imagePathMobile = 'https://image.tmdb.org/t/p/w185' + movie.image_path;

  return (
    <Modal
      onCloseModal={onCloseModal}
      className={classes['mobile']}
    >
      <div className={classes['movie-modal']}>
        <img src={imagePathMobile} alt={movie.title} />
        <div className={classes['rate']}>
          <h1>{movie.vote}</h1>
          <p>/ 10</p>
        </div>

        <div className={classes.content}>
          <h1 className={classes.title}>{movie.title}</h1>

          <span className={classes['line-spacer']}></span>

          <div className={classes['content-description']}>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <span className={classes.spacer} />
            <h3>Release Date</h3>
            <p>{movie.release_date.slice(0, 10)}</p>
          </div>

          <span className={classes['line-spacer']}></span>

          <div className={classes.buttons}>
            <FavoriteButton movieId={movie.movie_id} />
            <ReviewButton movieId={movie.movie_id} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModalMobile;
