import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import "./Settings.css";

const Settings = props => {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h2>Settings</h2>
            <ul>
                <li>
                    <h4>Profile</h4>
                </li>
                <li>
                    <h4>Notifications</h4>
                </li>
                <li>
                    <h4>Log out</h4>
                </li>
            </ul>
            <button className="settings__exit" onClick={this.onExit}>
                exit
            </button>
        </div>
    );
};

export default Settings;
