import React from 'react';
import { useParams } from 'react-router-dom';

import ReviewForm from '../components/Reviews/ReviewForm';

const CreateReview = () => {
  const { id: movieId } = useParams();

  return (
    <div className="section-container">
      <ReviewForm movieId={movieId} />
    </div>
  );
};

export default CreateReview;
