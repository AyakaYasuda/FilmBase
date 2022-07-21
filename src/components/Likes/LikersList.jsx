import React from 'react';

const LikersList = ({ setIsLikesListShown, likes }) => {
  console.log(likes);
  return (
    <div onClick={() => setIsLikesListShown(false)}>
      <p>LikersList will be here</p>
    </div>
  );
};

export default LikersList;
