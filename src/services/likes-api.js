import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_FILMBASE_API_LIKES,
});

export const getReviewsLikedByUserId = (args) => {
  const { userId, token } = args;
  return api
    .get(`/member/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.reviews);
};

export const getUsersWhoLikedByReviewId = (args) => {
  const { reviewId, token } = args;
  return api
    .get(`/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.members);
};

export const likeReview = (args) => {
  const { reviewId, userId, token } = args;
  return api
    .post(
      `/member/${userId}`,
      { reviewId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const removeLike = (args) => {
  const { reviewId, userId, token } = args;
  return api
    .delete(
      `/${reviewId}`,
      { memberId: userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};
