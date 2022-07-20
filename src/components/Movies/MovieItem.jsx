import React from 'react';
import classes from './MovieItem.module.css';

const MovieItem = (props) => {
  const imagePath = 'https://image.tmdb.org/t/p/w185' + props.image;

  return (
    <div className={classes.movie} onClick={() => props.onOpenModal(props.id)}>
      <div className={classes.image}>
        <img src={imagePath} alt={props.title} />
      </div>
      <div className={classes.overlay}>
        <h1 className={classes.title}>{props.title}</h1>
        <p className={classes.date}>Release Date :</p>
        <p className={classes.date}>{props.release_date.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default MovieItem;
