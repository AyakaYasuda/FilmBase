import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addFavoriteAction } from "../../store/reducers";

const FavoriteButton = props => {
  const dispatch = useDispatch();
  const addFavoriteHandler = () => {
    dispatch(addFavoriteAction(props.selectedMovie));
  };

  return (
    <FavoriteIcon
      sx={{ color: "#ffe251", fontSize: 30 }}
      onClick={addFavoriteHandler}
    />
  );
};

export default FavoriteButton;
