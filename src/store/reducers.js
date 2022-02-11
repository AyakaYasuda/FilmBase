const initialState = {
  favoriteMovieArray: [],
};

const ADD_FAV = "ADD_FAV";
export const addFavoriteAction = selectedMovie => {
  return {
    type: "ADD_FAV",
    payload: {
      selectedMovie,
    },
  };
};

const REMOVE_FAV = "REMOVE_FAV";
export const removeFavoriteAction = selectedMovieId => {
  return {
    type: "REMOVE_FAV",
    payload: {
      selectedMovieId,
    },
  };
};

export const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_FAV:
      return {
        favoriteMovieArray: [
          ...state.favoriteMovieArray,
          action.payload.selectedMovie,
        ],
      };
    case REMOVE_FAV:
      const updatedFavoriteMovieArray = Array.from(state.favoriteMovieArray);
      return {
        favoriteMovieArray: [
          ...updatedFavoriteMovieArray.filter(
            movie => movie.id !== action.payload.selectedMovieId
          ),
        ],
      };
    default:
      return state;
  }
};
