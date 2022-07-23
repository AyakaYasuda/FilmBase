import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as api from '../../services/users-api';
import { login } from '../../redux/usersSlice';
import useError from '../../hooks/useError';

import ErrorMessage from '../UI/ErrorMessage';
import classes from './LoginForm.module.scss';

const loginUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, status, resetErrorHandler, setErrorHandler } = useError();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginUserSchema) });

  const loginMutation = useMutation(api.login, {
    onSuccess: (data) => {
      const { userId, token } = data;
      dispatch(login({ userId, token }));

      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 60
      );

      localStorage.setItem(
        'userData',
        JSON.stringify({
          uid: userId,
          token: token,
          expiration: tokenExpirationDate,
        })
      );

      reset();
      navigate('/movies');
    },
    onError: (err) => {
      setErrorHandler(err.response.data, err.response.status);
    },
  });

  const loginHandler = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    loginMutation.mutate(userData);
  };

  return (
    <>
      {message && status && (
        <ErrorMessage
          message={message}
          status={status}
          onClick={resetErrorHandler}
        />
      )}
      <div className={classes['login-form']}>
        <h2>
          <span>L</span>ogin
        </h2>
        <form onSubmit={handleSubmit(loginHandler)}>
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
          <button>Log In</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
