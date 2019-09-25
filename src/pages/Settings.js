import React, { Component } from "react";

import "./Settings.css";

class Settings extends Component {
    render() {
        return (
            <div className="settings">
                <h3>Settings</h3>
                <ul>
                    <li>Profile</li>
                    <li>Notifications</li>
                    <li>Log out</li>
                </ul>
                <button className="settings__exit">exit</button>
            </div>
        );
    }
}

export default Settings;
