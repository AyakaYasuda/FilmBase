import React from 'react';
import { useMutation } from 'react-query';
import * as api from '../../services/users-api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './SignupForm.module.css';

const signupUserSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const SignupForm = ({ setIsLoginMode }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupUserSchema) });

  const signupMutation = useMutation(api.signup, {
    onSuccess: (data) => {
      reset();
      setIsLoginMode(true);
    },
  });

  const signupHandler = (data) => {
    const userData = {
      username: data.username,
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
          type="text"
          name="username"
          placeholder="Username"
          className={classes['signup-input']}
          {...register('username')}
        />
        <p className={classes['signup-error']}>{errors.username?.message}</p>
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
