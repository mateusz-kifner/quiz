import React, { Component } from "react";
import AuthContext from "../context/AuthContext";

import "./Settings.css";

class Settings extends Component {
    state = {
        visible: false,
        animation_time: 500
    };

    static contextType = AuthContext;

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ visible: true });
        });
    };

    onExit = () => {
        this.setState({ visible: false });
        setTimeout(() => {
            this.props.history.push("/Puzzles");
        }, this.state.animation_time);
    };

    render() {
        return (
            <div
                className={this.state.visible ? "settings" : "settings move-up"}
                style={{
                    transitionDuration: this.state.animation_time + "ms"
                }}
            >
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
    }
}

export default Settings;
