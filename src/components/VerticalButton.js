import React from "react";
var icons = require.context("../assets/icons", true);

/**
|--------------------------------------------------
| VerticalButton
|
|   @param props :  @param icon Icon form icons folder e.g. "./puzzle.png"
|   @param props :  @param title Title for button
|   @returns JSX button
|--------------------------------------------------
*/

const VerticalButton = props => {
    return (
        <button className="vertical-button">
            <img src={icons(props.icon)} alt="" />
            <h3>{props.title}</h3>
        </button>
    );
};

export default VerticalButton;
