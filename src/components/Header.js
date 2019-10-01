import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

var icons = require.context("../assets/icons", true);

/**
|--------------------------------------------------
| Header Bar
|--------------------------------------------------
*/

const Header = props => {
  return (
    <header className="header">
      <h1>Quiz App</h1>
      <NavLink to="/Settings">
        {props.profile_icon && (
          <img src={icons(props.profile_icon)} alt="Settings" />
        )}
      </NavLink>
    </header>
  );
};

export default Header;
