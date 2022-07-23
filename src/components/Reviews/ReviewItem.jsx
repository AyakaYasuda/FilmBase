import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import * as movieApi from '../../services/movies-api';
import * as reviewApi from '../../services/reviews-api';

import { styled } from '@mui/material/styles';
import LikeButton from '../Likes/LikeButton';
import Rating from '@mui/material/Rating';
import classes from './ReviewItem.module.scss';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffe251',
    fontSize: 28,
  },
  '& .MuiRating-iconHover': {
    color: '#ffe251',
    fontSize: 28,
  },
  '& .MuiRating-iconEmpty': {
    color: '#ffe251',
    fontSize: 28,
  },
});

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
    },
  });

  const deleteHandler = () => {
    deleteReviewMutation.mutate({ reviewId: review.review_id, token });
  };

  return (
    <div className={classes.review}>
      <h3>{movie?.title}</h3>
      <div className={classes.container}>
        <div className={classes.rating}>
          <StyledRating
            max={10}
            size="small"
            value={review.rate}
            precision={0.5}
            readOnly
          />
          <h6>{review.rate}</h6>
        </div>
        <p>{review.comment}</p>
        <h5>
          <small>Reviewed By</small> {review.name}
        </h5>
      </div>
      {review.reviewer_id === uid && (
        <div className={classes.buttons}>
          <Link to={`/my-reviews/${uid}/edit/${review.review_id}`}>
            <button>edit</button>
          </Link>
          <button onClick={deleteHandler}>delete</button>
        </div>
      )}

      <div className={classes['like-button']}>
        <LikeButton reviewId={review.review_id} />
      </div>
    </div>
  );
};

export default ReviewItem;
