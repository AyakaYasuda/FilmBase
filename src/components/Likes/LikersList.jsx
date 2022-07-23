import React from 'react';
import LikerItem from './LikerItem';

import classes from './LikersList.module.scss';

const LikersList = ({ setIsLikesListShown, likes }) => {
  return (
    <div
      onClick={() => setIsLikesListShown(false)}
      className={classes['likers-list']}
    >
      {likes.length !== 0 &&
        likes.map((like) => (
          <LikerItem
            key={like.member_id}
            id={like.member_id}
            name={like.name}
          />
        ))}
    </div>
  );
};

export default LikersList;
