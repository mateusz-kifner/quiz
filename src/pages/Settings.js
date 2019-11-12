import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";

import "./Settings.css";

const Settings = props => {
  const auth = useContext(AuthContext);

  const history = useHistory();

  const onExit = () => {
    history.push("/Puzzles");
  };

  return (
    <div className="settings">
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
      <button className="settings__exit" onClick={onExit}>
        exit
      </button>
    </div>
  );
};

export default Settings;
