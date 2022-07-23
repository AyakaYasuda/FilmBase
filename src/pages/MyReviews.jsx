import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/reviews-api';
import useError from '../hooks/useError';

import ErrorMessage from '../components/UI/ErrorMessage';
import ReviewItem from '../components/Reviews/ReviewItem';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoDataMessage from '../components/UI/NoDataMessage';
import classes from './MyReviews.module.scss';

const MyReviews = () => {
  const { uid, token } = useSelector((state) => state.users);
  const { message, status, resetErrorHandler, setErrorHandler } = useError();

  const {
    isError,
    isLoading,
    isFetching,
    data: myReviews,
  } = useQuery(
    ['MY_REVIEWS', uid],
    () => api.getReviewsByUserId({ uid, token }),
    {
      retry: false,
      enabled: !!uid,
      initialData: [],
      onError: (err) => {
        setErrorHandler(err.response.data.errors.message, err.response.status);
      },
    }
  );

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (myReviews.length === 0) {
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
          className={classes['my-reviews-container']}
          onClick={resetErrorHandler}
        >
          <h2>
            <span>M</span>y Reviews
          </h2>
          {myReviews.length !== 0 &&
            myReviews.map((review) => (
              <ReviewItem key={review.review_id} review={review} />
            ))}
        </div>
      )}
    </>
  );
};

export default MyReviews;
