import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as api from '../../services/movies-api';

const ReviewItem = ({ review }) => {
  const { uid, token } = useSelector((state) => state.users);
  const movieId = review.movie_id;

  const { data: movie } = useQuery(
    ['REVIEW_MOVIE', movieId],
    () => api.getMovieById({ movieId, token }),
    { retry: false, enabled: !!movieId }
  );

  return (
    <div>
      <h1>{movie?.title}</h1>
      <p>{review.comment}</p>
      <p>{review.rate}</p>
      <p>By {review.reviewer}</p>
      <Link to={`/my-reviews/${uid}/edit/${review.review_id}`}>
        <button>edit</button>
      </Link>
      <button>delete</button>
    </div>
  );
};

export default ReviewItem;
