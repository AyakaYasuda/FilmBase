import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as api from '../../services/reviews-api';

import classes from './ReviewForm.module.css';

const reviewSchema = yup.object().shape({
  rate: yup.number().required(),
  comment: yup.string(),
});

const ReviewForm = ({ movieId, reviewId, preloadedValues, submitType }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uid, token } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(reviewSchema) });

  const createReviewMutation = useMutation(api.createReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['MY_REVIEWS', uid]);
      navigate(`/my-reviews/${uid}`);
    },
  });

  const updateReviewMutation = useMutation(api.editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['MY_REVIEWS', uid]);
      navigate(`/my-reviews/${uid}`);
    },
  });

  const createHandler = (data) => {
    const reviewData = {
      movieId: movieId,
      rate: data.rate,
      comment: data.comment,
    };
    createReviewMutation.mutate({ uid, token, reviewData });
  };

  const updateHandler = (data) => {
    const reviewData = {
      rate: data.rate,
      comment: data.comment,
    };
    updateReviewMutation.mutate({ reviewId, reviewData, token });
  };

  const clearFormHandler = () => {
    reset();
    navigate(`/my-reviews/${uid}`);
  };

  const submitHandler = submitType === 'create' ? createHandler : updateHandler;

  useEffect(() => {
    setValue('rate', preloadedValues?.rate);
    setValue('comment', preloadedValues?.comment);
  }, [setValue, preloadedValues]);

  return (
    <>
      <h1>REVIEW</h1>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <label className={classes['form-label']} htmlFor="rate">
          Rate
        </label>
        <input
          className={classes['form-input']}
          type="number"
          name="rate"
          id="rate"
          {...register('rate')}
          min="0"
          max="5"
          step="0.1"
        />
        <p className={classes['form-error-message']}>{errors.rate?.message}</p>

        <label className={classes['form-label']} htmlFor="comment">
          Comment
        </label>
        <textarea
          className={classes['form-input']}
          name="comment"
          rows="5"
          id="comment"
          {...register('comment')}
        />
        <p className={classes['form-error-message']}>
          {errors.comment?.message}
        </p>

        <div className={classes['form-buttons']}>
          <button type="submit">Save</button>
          <button onClick={clearFormHandler}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default ReviewForm;
