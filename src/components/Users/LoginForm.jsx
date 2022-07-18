import React from 'react';
import classes from './LoginForm.module.css';

const LoginForm = ({ register, handleSubmit, errors, submitHandler }) => {
  return (
    <>
      <h1>LOG IN</h1>
      <form
        className={classes['login-form']}
        onSubmit={handleSubmit(submitHandler)}
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
