import React from 'react';
import { Fragment } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = (props) => {
  // const dispatch = useDispatch();
  // const favoriteMovieArray = useSelector(state => state.favoriteMovieArray);

  // const isFound = favoriteMovieArray.find(
  //   movie => movie.id === props.selectedMovie.id
  // );
  // console.log(isFound);

  // const addFavoriteHandler = () => {
  //   dispatch(addFavoriteAction(props.selectedMovie));
  // };

  // const removeFavoriteHandler = () => {
  //   dispatch(removeFavoriteAction(props.selectedMovie.id));
  // };

  return (
    <Fragment>
      <FavoriteIcon
        sx={{ color: '#ffe251', fontSize: 30 }}
        // onClick={removeFavoriteHandler}
      />

      {/* <FavoriteBorderIcon
          sx={{ color: "#ffe251", fontSize: 30 }}
          // onClick={addFavoriteHandler}
        /> */}
    </Fragment>
  );
};

export default FavoriteButton;
