import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

import classes from './ReviewButton.module.scss';

const ReviewButton = ({ movieId }) => {
  return (
    <Link to={`/my-reviews/${movieId}/new`}>
      <button className={classes['review-button']}>
        <h6>review</h6>
        <VisibilityIcon sx={{ color: '#3ec9a6', fontSize: 24 }} />
      </button>
    </Link>
  );
};

export default ReviewButton;
