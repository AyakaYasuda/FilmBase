import React from "react";
import classes from "./MovieItem.module.css";

const MovieItem = props => {
  const imagePath = "https://image.tmdb.org/t/p/w300" + props.image;

  return (
    <div className={classes.movie}>
      <div className={classes.image}>
        <img src={imagePath} alt={props.title} />
      </div>
      <div className={classes.overlay}>
        <h1 className={classes.title}>{props.title}</h1>
        <p className={classes.overview}>{props.overview}</p>
        <h2 className={classes.date}>Release Date : {props.release_date}</h2>
      </div>
    </div>
  );
};

export default MovieItem;
