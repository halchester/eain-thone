import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import * as actionTypes from "../store/acionTypes";
import clsx from "clsx";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

// Hooks
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "250px",
  },
});

const CustomDrawer = () => {
  const isDrawerOpen = useSelector((state) => state.ui.isDrawerOpen);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={clsx(classes.list)}>
      <SwipeableDrawer
        className={classes.root}
        open={isDrawerOpen}
        onClose={() => dispatch({ type: actionTypes.TOGGLE_DRAWER })}
        onOpen={() => dispatch({ type: actionTypes.TOGGLE_DRAWER })}
      >
        <List>
          <ListItem
            className={classes.root}
            onClick={() => {
              history.push("/");
              dispatch({ type: actionTypes.CLOSE_DRAWER });
            }}
          >
            <ListItemIcon>
              <NewReleasesIcon />
            </ListItemIcon>
            <ListItemText primary={"In Stock Items"} />
          </ListItem>
          <ListItem
            className={classes.root}
            onClick={() => {
              history.push("/tobuy");
              dispatch({ type: actionTypes.CLOSE_DRAWER });
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"To Buy Items"} />
          </ListItem>
          <Divider />
          <ListItem
            onClick={() => {
              dispatch({ type: actionTypes.SIGNOUT_CURRENT_USER });
              dispatch({ type: actionTypes.CLOSE_DRAWER });
              history.push("/");
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItem>
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default CustomDrawer;
