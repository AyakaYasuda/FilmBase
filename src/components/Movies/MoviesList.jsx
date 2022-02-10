import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import ListHeader from "../Layout/ListHeader";
import MovieModal from "./MovieModal";
import classes from "./MoviesList.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const MoviesList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);
  const [movieId, setMovieId] = useState("");

  const openModalHandler = id => {
    setModalIsShown(true);
    setMovieId(id);
  };

  const closeModalHandler = () => {
    setModalIsShown(false);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedMovies = responseData.results;
      console.log(loadedMovies);
      setMovies(loadedMovies);
      setIsLoading(false);
    };

    fetchMovies().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const moviesList = movies.map(movie => (
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
      <ListHeader />
      {modalIsShown && (
        <MovieModal movies={movies} movieId={movieId} onCloseModal={closeModalHandler} />
      )}
      <div className={classes.container}>{moviesList}</div>
      <div className={classes.spacer}></div>
    </section>
  );
};

export default MoviesList;
