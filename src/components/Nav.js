import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";

const Nav = props => (
    <nav className="main-nav">
        <NavLink to="/Puzzles">Puzzles</NavLink>
        <NavLink to="/Chat">Chat</NavLink>
        <NavLink to="/Grades">Grades</NavLink>
    </nav>
);

export default Nav;
