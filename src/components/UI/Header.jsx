import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/usersSlice';
import useUser from '../../hooks/useUser';

import Logo from './Logo';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, uid } = useSelector((state) => state.users);
  const { user } = useUser();

  const logoutHandler = () => {
    localStorage.removeItem('userData');
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <div className={classes['mobile-top']}>
          <div className={classes.flex}>
            <Logo />
            {isLoggedIn && <button onClick={logoutHandler}>log out</button>}
          </div>
          {isLoggedIn && (
            <h4>
              Welcome back{' '}
              <span className={classes.name}>{user && user.name}</span> !
            </h4>
          )}
        </div>
        <div className={classes['desktop-top']}>
          <Logo />
          <div className={classes.flex}>
            {isLoggedIn && (
              <h4>
                Welcome back{' '}
                <span className={classes.name}>{user && user.name}</span> !
              </h4>
            )}
            {isLoggedIn && <button onClick={logoutHandler}>log out</button>}
          </div>
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
              Favorite
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
    </div>
  );
};

export default Header;
