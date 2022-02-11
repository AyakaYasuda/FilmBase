import React from "react";
import { useSelector } from "react-redux";

const FavoriteMoviesList = () => {
  const favoriteMovieList = useSelector(state => state.favoriteMovieList);
  console.log(favoriteMovieList);
  
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default FavoriteMoviesList;
