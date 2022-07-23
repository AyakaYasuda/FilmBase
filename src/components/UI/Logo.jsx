import React from 'react';
import classes from './Logo.module.scss';

const Logo = () => {
  return (
    <h1>
      Filmbase<span className={classes.dot}>.</span>
    </h1>
  );
};

export default Logo;
