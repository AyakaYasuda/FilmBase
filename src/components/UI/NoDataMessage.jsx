import React from 'react';

import classes from './NoDataMessage.module.scss';

const NoDataMessage = ({ children }) => {
  return (
    <div className={classes['no-data']}>
      <h4>{children}</h4>
    </div>
  );
};

export default NoDataMessage;
