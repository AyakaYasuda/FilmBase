import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as api from '../../services/reviews-api';
import useError from '../../hooks/useError';

import ErrorMessage from '../UI/ErrorMessage';
import classes from './ReviewForm.module.scss';

const reviewSchema = yup.object().shape({
  rate: yup.number().required(),
  comment: yup.string(),
});

const ReviewForm = ({ movieId, reviewId, preloadedValues, submitType }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { uid, token } = useSelector((state) => state.users);
  const { message, status, resetErrorHandler, setErrorHandler } = useError();

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
    onError: (err) => {
      setErrorHandler(err.response.data.errors.message, err.response.status);
    },
  });

  const updateReviewMutation = useMutation(api.editReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['MY_REVIEWS', uid]);
      navigate(`/my-reviews/${uid}`);
    },
    onError: (err) => {
      setErrorHandler(err.response.data.errors.message, err.response.status);
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
      {message && status && (
        <ErrorMessage
          message={message}
          status={status}
          onClick={resetErrorHandler}
        />
      )}
      <div className={classes['review-form']} onClick={resetErrorHandler}>
        <h2>
          <span>R</span>ate & <span>R</span>eview
        </h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor="rate">Rate</label>
          <input
            type="number"
            name="rate"
            id="rate"
            {...register('rate')}
            min="0"
            max="10"
            step="0.1"
          />
          <small>{errors.rate?.message}</small>

          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            rows="10"
            id="comment"
            {...register('comment')}
          />
          <small>{errors.comment?.message}</small>

          <div className={classes['form-buttons']}>
            <button onClick={clearFormHandler}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
