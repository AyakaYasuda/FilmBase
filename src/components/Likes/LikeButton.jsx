import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import * as api from '../../services/likes-api';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import LikersList from './LikersList';
import classes from './LikeButton.module.scss';

const LikeButton = ({ reviewId }) => {
  const { uid: userId, token } = useSelector((state) => state.users);
  const [isLiked, setIsLiked] = useState();
  const [isLikesListShown, setIsLikesListShown] = useState(false);
  const queryClient = useQueryClient();

  const { data: likes } = useQuery(
    ['LIKES', reviewId],
    () => api.getUsersWhoLikedByReviewId({ reviewId, token }),
    {
      retry: false,
      initialData: [],
      enabled: !!reviewId,
    }
  );

  const likeReviewMutation = useMutation(api.likeReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('LIKES', reviewId);
    },
  });

  const removeLikeMutation = useMutation(api.removeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('LIKES', reviewId);
    },
  });

  const likeReviewHandler = () => {
    likeReviewMutation.mutate({ reviewId, userId, token });
    setIsLiked(true);
  };

  const removeLikeHandler = () => {
    removeLikeMutation.mutate({ reviewId, userId, token });
    setIsLiked(false);
  };

  const showLikesListHandler = () => {
    setIsLikesListShown(true);
  };

  const userIdArr = likes.map((like) => like.member_id);

  useEffect(() => {
    setIsLiked(userIdArr.includes(userId));
  }, [userIdArr, userId]);

  return (
    <div>
      {isLiked ? (
        <button className={classes['like-button']}>
          <ThumbUpAltIcon
            sx={{ color: '#ee697d', fontSize: 24 }}
            onClick={removeLikeHandler}
          />
          <p onClick={showLikesListHandler}>{likes.length}</p>
        </button>
      ) : (
        <button className={classes['like-button']}>
          <ThumbUpOffAltIcon
            sx={{ color: '#ee697d', fontSize: 24 }}
            onClick={likeReviewHandler}
          />
          <p onClick={showLikesListHandler}>{likes.length}</p>
        </button>
      )}

      {isLikesListShown && (
        <LikersList setIsLikesListShown={setIsLikesListShown} likes={likes} />
      )}
    </div>
  );
};

export default LikeButton;
