import React from 'react';
import { Link } from 'react-router-dom';

import classes from './LikerItem.module.scss';

const LikerItem = ({ name, id }) => {
  return (
    <div className={classes['liker-item']}>
      <p>{name}</p>
      <div className={classes.buttons}>
        <Link to={`/reviews/${id}`}>
          <button>reviews</button>
        </Link>
        <Link to={`/likes/${id}`}>
          <button>likes</button>
        </Link>
      </div>
    </div>
  );
};

export default LikerItem;
