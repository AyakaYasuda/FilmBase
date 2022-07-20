import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as movieApi from '../../services/movies-api';
import * as reviewApi from '../../services/reviews-api';

const ReviewItem = ({ review }) => {
  const { uid, token } = useSelector((state) => state.users);
  const movieId = review.movie_id;
  const queryClient = useQueryClient();

  const { data: movie } = useQuery(
    ['REVIEW_MOVIE', movieId],
    () => movieApi.getMovieById({ movieId, token }),
    { retry: false, enabled: !!movieId }
  );

  const deleteReviewMutation = useMutation(reviewApi.deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['MY_REVIEWS', uid]);
      console.log('deleted');
    },
  });

  const deleteHandler = () => {
    deleteReviewMutation.mutate({ reviewId: review.review_id, token });
  };

  return (
    <div>
      <h1>{movie?.title}</h1>
      <p>{review.comment}</p>
      <p>{review.rate}</p>
      <p>By {review.reviewer}</p>
      <Link to={`/my-reviews/${uid}/edit/${review.review_id}`}>
        <button>edit</button>
      </Link>
      <button onClick={deleteHandler}>delete</button>
    </div>
  );
};

export default ReviewItem;
