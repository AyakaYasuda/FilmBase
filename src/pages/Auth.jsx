import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import SignupForm from '../components/Users/SignupForm';
import LoginForm from '../components/Users/LoginForm';

const signupUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const loginUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const {
    register: signupFromRegister,
    handleSubmit: signupFormHandleSubmit,
    reset: signupFormReset,
    formState: { errors: signupErrors },
  } = useForm({ resolver: yupResolver(signupUserSchema) });

  const {
    register: loginFormRegister,
    handleSubmit: loginFormHandleSubmit,
    reset: loginFormReset,
    formState: { errors: loginErrors },
  } = useForm({ resolver: yupResolver(loginUserSchema) });

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
          <LoginForm
            register={loginFormRegister}
            handleSubmit={loginFormHandleSubmit}
            errors={loginErrors}
            reset={loginFormReset}
          />
          <p onClick={switchToSignupModeHandler}>
            You don't have an account? SIGN UP
          </p>
        </>
      ) : (
        <>
          <SignupForm
            register={signupFromRegister}
            handleSubmit={signupFormHandleSubmit}
            errors={signupErrors}
            reset={signupFormReset}
            setIsLoginMode={setIsLoginMode}
          />
          <p onClick={switchToLoginModeHandler}>
            You already have an account? LOG IN
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;
