import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../../services/movies-api';

const ReviewItem = ({ review }) => {
  const { token } = useSelector((state) => state.users);
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
    </div>
  );
};

export default ReviewItem;
