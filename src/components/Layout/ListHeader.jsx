import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./ListHeader.module.css";

const ListHeader = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.title}>
          <h1>Discover Films</h1>
        </div>
        <ul className={classes.menu}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.active : ""}`
            }
          >
            Popular
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${classes.link} ${isActive ? classes.active : ""}`
            }
          >
            Favorites
          </NavLink>
          <li className={classes.link}>Watched</li>
        </ul>
      </header>
    </Fragment>
  );
};

export default ListHeader;
