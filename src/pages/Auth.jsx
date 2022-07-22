import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SignupForm from '../components/Users/SignupForm';
import LoginForm from '../components/Users/LoginForm';

import classes from './Auth.module.scss';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoggedIn } = useSelector((state) => state.users);

  const switchToSignupModeHandler = () => {
    setIsLoginMode(false);
  };

  const switchToLoginModeHandler = () => {
    setIsLoginMode(true);
  };

  if (isLoggedIn) {
    return (
      <div className={classes['auto-login-msg']}>
        <h5>You are already logged in!</h5>
        <h3>
          Discover most popular movies <span>RIGHT NOW</span>
        </h3>
        <Link to="/movies">
          <button>check out</button>
        </Link>
      </div>
    );
  }

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
