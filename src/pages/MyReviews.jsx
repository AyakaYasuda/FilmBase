import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/reviews-api';

import ReviewItem from '../components/Reviews/ReviewItem';

const MyReviews = () => {
  const { uid, token } = useSelector((state) => state.users);
  const [myReviews, setMyReviews] = useState();

  const { isLoading, isFetching } = useQuery(
    ['MY_REVIEWS', uid],
    () => api.getReviewsByUserId({ uid, token }),
    {
      retry: false,
      enabled: !!uid,
      onSuccess: (data) => {
        setMyReviews(data);
      },
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
      {myReviews &&
        myReviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
    </div>
  );
};

export default MyReviews;
