import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as userApi from '../services/users-api';
import * as likeApi from '../services/likes-api';

import ReviewItem from '../components/Reviews/ReviewItem';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './UsersLikes.module.scss';

const UsersLikes = () => {
  const { uid } = useParams();
  const { token } = useSelector((state) => state.users);

  const {
    isLoading,
    isFetching,
    data: reviews,
  } = useQuery(
    ['OTHER_USERS_REVIEWS_LIKED', uid],
    () => likeApi.getReviewsLikedByUserId({ userId: uid, token }),
    { retry: false, initialData: [], enabled: !!uid }
  );

  const {
    isLoading: userLoading,
    isFetching: userFetching,
    data: user,
  } = useQuery(
    ['OTHER_USER', uid],
    () => userApi.getUserById({ id: uid, token }),
    { retry: false, initialData: null, enabled: !!uid }
  );

  if (isLoading || isFetching || userLoading || userFetching) {
    return <LoadingSpinner />;
  }
  // FIXME: error handling

  return (
    <div className={classes['users-likes-container']}>
      {user && (
        <h2>
          <span className={classes.accent}>C</span>heck out reviews{' '}
          <span className={classes.name}>{user.name}</span> liked
        </h2>
      )}
      {reviews.length !== 0 &&
        reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
    </div>
  );
};

export default UsersLikes;
