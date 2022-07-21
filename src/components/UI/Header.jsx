import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/usersSlice';

import classes from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, uid, username } = useSelector((state) => state.users);

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.title}>
          <h1>Filmbase</h1>
          {isLoggedIn && (
            <div>
              <p>
                Welcome back <span>{username && username}</span>!
              </p>
              <p onClick={logoutHandler}>log out</p>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <ul className={classes.menu}>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : undefined}`
              }
            >
              Popular
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : undefined}`
              }
            >
              Favorites
            </NavLink>
            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : undefined}`
              }
            >
              Reviews
            </NavLink>
            <NavLink
              to={`/my-reviews/${uid}`}
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : undefined}`
              }
            >
              My Reviews
            </NavLink>
          </ul>
        )}
      </header>
    </>
  );
};

export default Header;
