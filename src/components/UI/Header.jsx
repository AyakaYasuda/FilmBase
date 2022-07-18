import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.title}>
          <h1>Discover Films</h1>
        </div>
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
      </header>
    </>
  );
};

export default Header;
