import React from "react";
import { NavLink } from "react-router-dom";

import "./Nav.css";
var icons = require.context("../assets/icons", true);

/**
|--------------------------------------------------
| Simple navigation at bottom
| 
| @param props : link = {to:'/NavUrl',name:'NavName',icon:'./Icon_in_icons_folder'}
| @returns JSX nav tag with NavLinks inside
|--------------------------------------------------
*/

const Nav = props => (
    <nav className="main-nav">
        {props.links.map(link => {
            return (
                <NavLink key={link.name} to={link.to}>
                    {link.icon && <img src={icons(link.icon)} alt="" />}
                    {link.name}
                </NavLink>
            );
        })}
    </nav>
);

export default Nav;
