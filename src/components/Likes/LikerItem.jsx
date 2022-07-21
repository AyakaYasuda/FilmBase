import React from 'react';

const LikerItem = ({ name, id }) => {
  return (
    <div>
      <p>{name}</p>
      <button>view reviews</button>
      <button>view likes</button>
    </div>
  );
};

export default LikerItem;
