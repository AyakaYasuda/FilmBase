import React, { useState } from 'react';

import SignupForm from '../components/Users/SignupForm';
import LoginForm from '../components/Users/LoginForm';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchToSignupModeHandler = () => {
    setIsLoginMode(false);
  };

  const switchToLoginModeHandler = () => {
    setIsLoginMode(true);
  };

  return (
    <div className="section-container">
      {isLoginMode ? (
        <>
          <LoginForm />
          <p onClick={switchToSignupModeHandler}>
            You don't have an account? SIGN UP
          </p>
        </>
      ) : (
        <>
          <SignupForm setIsLoginMode={setIsLoginMode} />
          <p onClick={switchToLoginModeHandler}>
            You already have an account? LOG IN
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
