import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import * as api from '../services/reviews-api';

import ReviewItem from '../components/Reviews/ReviewItem';

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
    return (
      <div className="section-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="section-container">
      {reviews.length !== 0 &&
        reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
    </div>
  );
};

export default Reviews;
