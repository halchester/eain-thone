import React from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import * as actionTypes from "../store/acionTypes";

// Hooks
import { useDispatch, useSelector } from "react-redux";

import CustomDrawer from "./CustomDrawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const CustomAppbar = ({ name }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);


  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            dispatch({ type: actionTypes.TOGGLE_DRAWER });
          }}
        >
          <MenuIcon />
        </IconButton>
        <CustomDrawer />
        <Typography variant="h6" className={classes.title}>
          {name}
        </Typography>
        <Typography>@{auth.userData.username}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
