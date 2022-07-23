import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import * as api from '../services/reviews-api';
import useError from '../hooks/useError';

import ErrorMessage from '../components/UI/ErrorMessage';
import ReviewItem from '../components/Reviews/ReviewItem';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoDataMessage from '../components/UI/NoDataMessage';
import classes from './Reviews.module.scss';

const Reviews = () => {
  const { token } = useSelector((state) => state.users);
  const { message, status, resetErrorHandler, setErrorHandler } = useError();

  const {
    isError,
    isLoading,
    isFetching,
    data: reviews,
  } = useQuery(['ALL_REVIEWS'], () => api.getAllReviews({ token }), {
    retry: false,
    initialData: [],
    onError: (err) => {
      setErrorHandler(err.response.data.errors.message, err.response.status);
    },
  });

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (reviews.length === 0) {
    return <NoDataMessage>No reviews yet...</NoDataMessage>;
  }

  return (
    <>
      {message && status && (
        <ErrorMessage
          message={message}
          status={status}
          onClick={resetErrorHandler}
        />
      )}
      {!isError && (
        <div
          className={classes['reviews-container']}
          onClick={resetErrorHandler}
        >
          <h2>
            <span>E</span>xplore <span>R</span>eviews
          </h2>
          {reviews.length !== 0 &&
            reviews.map((review) => (
              <ReviewItem key={review.review_id} review={review} />
            ))}
        </div>
      )}
    </>
  );
};

export default Reviews;
