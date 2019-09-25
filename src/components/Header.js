import React, { Component } from "react";

import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Quiz App</h1>
                <button>Settings</button>
                <button>Login</button>
            </header>
        );
    }
}

export default Header;
