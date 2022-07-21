import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as api from '../services/reviews-api';
import ReviewForm from '../components/Reviews/ReviewForm';

const EditReview = () => {
  const { rid: reviewId } = useParams();
  const { token } = useSelector((state) => state.users);

  const { data: review } = useQuery(
    ['REVIEW_EDIT', reviewId],
    () => api.getReviewById({ reviewId, token }),
    { retry: false, initialData: null, enabled: !!reviewId }
  );

  return (
    <div className="section-container">
      <ReviewForm
        submitType="update"
        reviewId={reviewId}
        preloadedValues={{
          rate: review?.rate,
          comment: review?.comment,
        }}
      />
    </div>
  );
};

export default EditReview;
