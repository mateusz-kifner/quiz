import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import propTypes from "prop-types";

import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Icon
} from "@material-ui/core";
import { Restore, Favorite, LocationOn } from "@material-ui/icons";

// import "./Nav.css";
var icons = require.context("../assets/icons", true);

/**
|--------------------------------------------------
| Simple navigation at bottom
| 
| @param props : link = {to:'/NavUrl',name:'NavName',icon:'./Icon_in_icons_folder'}
| @returns JSX nav tag with NavLinks inside
|--------------------------------------------------
*/

const Nav = props => {
  const history = useHistory();

  const useStyles = makeStyles({
    root: {
      width: 500
    },
    stickToBottom: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      background: "#333"
    },
    icon: {
      height: "100%",
      width: "100%",
      position: "relative",
      top: "50%",
      transform: "translate(0,-50%)"
    },
    link: {
      color: "#fff"
    }
  });

  const classes = useStyles();
  return (
    <BottomNavigation
      className={(classes.root, classes.stickToBottom)}
      showLabels
    >
      {props.links.map(link => (
        // <NavLink key={link.name} to={link.to}>
        <BottomNavigationAction
          key={link.name}
          label={link.name}
          value={link.name}
          icon={
            link.icon && (
              <Icon>
                <img src={icons(link.icon)} alt="" className={classes.icon} />
              </Icon>
            )
          }
          onClick={() => {
            if (link.onClick != undefined) link.onClick();
            else history.push(link.to);
          }}
          className={classes.link}
        />
        // </NavLink>
      ))}
    </BottomNavigation>
  );
};

Nav.propTypes = {
  links: propTypes.array.isRequired
};

export default Nav;
