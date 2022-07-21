import React from 'react';
import { Link } from 'react-router-dom';

const LikerItem = ({ name, id }) => {
  return (
    <div>
      <p>{name}</p>
      <Link to={`/reviews/${id}`}>
        <button>view reviews</button>
      </Link>
      <Link to={`/likes/${id}`}>
        <button>view likes</button>
      </Link>
    </div>
  );
};

export default LikerItem;
