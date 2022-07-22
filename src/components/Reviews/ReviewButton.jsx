import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ReviewButton = ({ movieId }) => {
  return (
    <Link to={`/my-reviews/${movieId}/new`}>
      <VisibilityIcon sx={{ color: '#3ec9a6', fontSize: 30 }} />
    </Link>
  );
};

export default ReviewButton;
