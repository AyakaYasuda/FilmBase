import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import * as api from '../services/reviews-api';

import ReviewItem from '../components/Reviews/ReviewItem';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoDataMessage from '../components/UI/NoDataMessage';
import classes from './Reviews.module.scss';

const Reviews = () => {
  const { token } = useSelector((state) => state.users);

  const {
    isLoading,
    isFetching,
    data: reviews,
  } = useQuery(['ALL_REVIEWS'], () => api.getAllReviews({ token }), {
    retry: false,
    initialData: [],
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }
  //FIXME: error handling

  if (reviews.length === 0) {
    return <NoDataMessage>No reviews yet...</NoDataMessage>;
  }

  return (
    <div className={classes['reviews-container']}>
      <h2>
        <span>E</span>xplore <span>R</span>eviews
      </h2>
      {reviews.length !== 0 &&
        reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
    </div>
  );
};

export default Reviews;
