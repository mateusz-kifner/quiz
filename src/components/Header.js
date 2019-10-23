import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Icon } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// import "./Header.css";

var icons = require.context("../assets/icons", true);

/**
|--------------------------------------------------
| Header Bar
|--------------------------------------------------
*/

const Header = props => {
  const history = useHistory();
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    icon: {
      height: "100%",
      borderRadius: "50%"
    }
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push("/Settings");
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Quiz App
          </Typography>
          {/* <NavLink to="/Settings">
            {props.profile_icon && (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <Icon>
                  <img
                    src={icons(props.profile_icon)}
                    alt="Settings"
                    className={classes.icon}
                  />
                </Icon>
              </IconButton>
            )}
          </NavLink> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
