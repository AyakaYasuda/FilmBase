import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FILMBASE_API_REVIEWS,
});

export const getAllReviews = (args) => {
  const { token } = args;
  return api
    .get('/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.reviews);
};

export const getReviewById = (args) => {
  const { token, reviewId } = args;
  return api
    .get(`/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.review);
};

export const getReviewsByUserId = (args) => {
  const { uid, token } = args;
  return api
    .get(`/member/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.reviews);
};

export const createReview = (args) => {
  const { uid, token, reviewData } = args;
  return api
    .post(
      `/member/${uid}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const editReview = (args) => {
  const { reviewId, reviewData, token } = args;
  return api
    .put(
      `/${reviewId}`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const deleteReview = (args) => {
  const { reviewId, token } = args;
  return api
    .delete(`/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
