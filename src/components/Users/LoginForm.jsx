import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/users-api';
import { login } from '../../redux/usersSlice';
import classes from './LoginForm.module.css';

const LoginForm = ({ register, handleSubmit, errors, reset }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <h1>LOG IN</h1>
      <form
        className={classes['login-form']}
        onSubmit={handleSubmit(loginHandler)}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={classes['login-input']}
          {...register('email')}
        />
        <p className={classes['login-error']}>{errors.email?.message}</p>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={classes['login-input']}
          {...register('password')}
        />
        <p className={classes['login-error']}>{errors.password?.message}</p>
        <button>Log In</button>
      </form>
    </>
  );
};

export default LoginForm;
