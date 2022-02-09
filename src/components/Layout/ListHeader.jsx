import { Fragment } from "react";
import classes from "./ListHeader.module.css";

const ListHeader = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.title}>
          <h1>Discover Films</h1>
        </div>
        <ul className={classes.menu}>
          <li>Popular</li>
          <li>Favorites</li>
        </ul>
      </header>
    </Fragment>
  );
};

export default ListHeader;
