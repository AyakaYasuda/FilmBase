import React from 'react';
import { useMutation } from 'react-query';
import * as api from '../../services/users-api';

import classes from './SignupForm.module.css';

const SignupForm = ({
  register,
  handleSubmit,
  errors,
  reset,
  setIsLoginMode,
}) => {
  const signupMutation = useMutation(api.signup, {
    onSuccess: () => {
      reset();
      setIsLoginMode(true);
    },
  });

  const signupHandler = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    signupMutation.mutate(userData);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form
        className={classes['signup-form']}
        onSubmit={handleSubmit(signupHandler)}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={classes['signup-input']}
          {...register('email')}
        />
        <p className={classes['signup-error']}>{errors.email?.message}</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={classes['signup-input']}
          {...register('password')}
        />
        <p className={classes['signup-error']}>{errors.password?.message}</p>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className={classes['signup-input']}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message && (
          <p className={classes['signup-error']}>
            confirm password must be the same as password above
          </p>
        )}
        <button>Sign Up</button>
      </form>
    </>
  );
};

export default SignupForm;
