import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import * as userApi from '../services/users-api';
import * as likeApi from '../services/likes-api';
import ReviewItem from '../components/Reviews/ReviewItem';

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
    return (
      <div className="section-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="section-container">
      {user && <h1>Check out reviews {user.name} liked</h1>}
      {reviews.length !== 0 &&
        reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))}
    </div>
  );
};

export default UsersLikes;
