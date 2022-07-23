import React from 'react';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = ({ status, message, onClick }) => {
  return (
    <div className={classes.error} onClick={onClick}>
      <p>Sorry, something went wrong...</p>
      <small>
        {status} : {message}
      </small>
    </div>
  );
};

export default ErrorMessage;
