import React, { useEffect, useState } from "react";
import ListHeader from "../components/Layout/ListHeader";
import MoviesList from "../components/Movies/MoviesList";

const API_KEY = process.env.REACT_APP_API_KEY;

const PopularMovies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

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

  return (
    <div>
      <ListHeader />
      <MoviesList movies={movies} />
    </div>
  );
};

export default PopularMovies;
