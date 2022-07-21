import React from 'react';
import LikerItem from './LikerItem';

const LikersList = ({ setIsLikesListShown, likes }) => {
  console.log(likes);
  return (
    <div onClick={() => setIsLikesListShown(false)}>
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
