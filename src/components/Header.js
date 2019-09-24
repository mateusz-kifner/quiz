import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Quiz App</h1>
                <NavLink to="/Settings">Settings</NavLink>
                <NavLink to="/Auth">Sing in</NavLink>
            </header>
        );
    }
}

export default Header;
