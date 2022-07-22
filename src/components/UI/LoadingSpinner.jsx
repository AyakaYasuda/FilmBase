import React from 'react';
import { Grid } from 'react-loader-spinner';
import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={classes['loading-container']}>
      <Grid color="#3ec9a6" width="100" height="100" />
    </div>
  );
};

export default LoadingSpinner;
