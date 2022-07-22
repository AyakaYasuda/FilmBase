import React, { useState } from 'react';

import SignupForm from '../components/Users/SignupForm';
import LoginForm from '../components/Users/LoginForm';

import classes from './Auth.module.scss';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchToSignupModeHandler = () => {
    setIsLoginMode(false);
  };

  const switchToLoginModeHandler = () => {
    setIsLoginMode(true);
  };

  return (
    <div className={classes['auth-container']}>
      {isLoginMode ? (
        <>
          <LoginForm />
          <p onClick={switchToSignupModeHandler} className={classes.msg}>
            You don't have an account? <span>SIGN UP</span>
          </p>
        </>
      ) : (
        <>
          <SignupForm setIsLoginMode={setIsLoginMode} />
          <p onClick={switchToLoginModeHandler} className={classes.msg}>
            You already have an account? <span>LOG IN</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
