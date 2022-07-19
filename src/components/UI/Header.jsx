import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/usersSlice';

import classes from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.users);

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
          {isLoggedIn && <p onClick={logoutHandler}>log out</p>}
        </div>
        {isLoggedIn && (
          <ul className={classes.menu}>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : ''}`
              }
            >
              Popular
            </NavLink>
            <NavLink
              to="/movies/favorites"
              className={({ isActive }) =>
                `${classes.link} ${isActive ? classes.active : ''}`
              }
            >
              Favorites
            </NavLink>
            <li className={classes.link}>Watched</li>
          </ul>
        )}
      </header>
    </>
  );
};

export default Header;
