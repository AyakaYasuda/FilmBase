const initialState = {
  favoriteMovieList: [],
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

export const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_FAV:
      return {
        favoriteMovieList: [
          ...state.favoriteMovieList,
          action.payload.selectedMovie,
        ],
      };
    default:
      return state;
  }
};
