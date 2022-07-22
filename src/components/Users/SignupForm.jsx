import React from 'react';
import { useMutation } from 'react-query';
import * as api from '../../services/users-api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './SignupForm.module.scss';

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
    <div className={classes['signup-form']}>
      <h2>
        <span>S</span>ignup
      </h2>
      <form onSubmit={handleSubmit(signupHandler)}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          {...register('username')}
        />
        <small>{errors.username?.message}</small>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register('email')}
        />
        <small>{errors.email?.message}</small>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <small>{errors.password?.message}</small>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message && (
          <small>confirm password must be the same as password above</small>
        )}
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
