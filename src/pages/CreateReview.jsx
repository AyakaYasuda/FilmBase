import React from 'react';
import { useParams } from 'react-router-dom';

import ReviewForm from '../components/Reviews/ReviewForm';
import classes from './CreateReviews.module.scss';

const CreateReview = () => {
  const { id: movieId } = useParams();

  return (
    <div className={classes['create-review-container']}>
      <ReviewForm movieId={movieId} submitType="create" />
    </div>
  );
};

export default CreateReview;
