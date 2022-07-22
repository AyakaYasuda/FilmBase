import React from 'react';
import classes from './MovieItem.module.scss';

const MovieItem = ({ onOpenModal, id, image, title, release_date }) => {
  const imagePathDesktop = 'https://image.tmdb.org/t/p/w185' + image;
  const imagePathMobile = 'https://image.tmdb.org/t/p/w92' + image;

  console.log(imagePathMobile);

  return (
    <>
      <div
        className={classes['movie-item-mobile']}
        onClick={() => onOpenModal(id)}
      >
        <img src={imagePathMobile} alt={title} />

        <div className={classes.overlay}>
          <h6>{title}</h6>
          <small>Release Date :</small>
          <small>{release_date.slice(0, 10)}</small>
        </div>
      </div>
      <div
        className={classes['movie-item-desktop']}
        onClick={() => onOpenModal(id)}
      >
        <img src={imagePathDesktop} alt={title} />

        <div className={classes.overlay}>
          <h3>{title}</h3>
          <small>Release Date :</small>
          <small>{release_date.slice(0, 10)}</small>
        </div>
      </div>
    </>
  );
};

export default MovieItem;
