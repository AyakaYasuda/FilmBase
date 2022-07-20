import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/reviews-api';

import ReviewItem from '../components/Reviews/ReviewItem';

const MyReviews = () => {
  const { uid, token } = useSelector((state) => state.users);

  const {
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
    }
  );

  if (isLoading || isFetching) {
    return (
      <div className="section-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="section-container">
      {myReviews.length !== 0 &&
        myReviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
    </div>
  );
};

export default MyReviews;
