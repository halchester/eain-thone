import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import moment from "moment";

const cardStyles = makeStyles({
  root: {
    padding: "0.75rem",
    marginBottom: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: "0.5rem",
  },
});

const InstockItemCard = ({ item }) => {
  const classes = cardStyles();
  console.log(item);
  return (
    <Card elevation={3} className={classes.root}>
      <Box className={classes.container}>
        <p className="text-lg">{item.name}</p>
        {item.picURL ? (
          <img
            className="rounded-full"
            src={item.picURL}
            style={{ height: 100 }}
            alt=""
          />
        ) : null}
        <p className="text-lg text-green-700">
          Total : <strong>{item.quantity}</strong>
        </p>
      </Box>
      <p className="text-sm text-gray-400">
        {moment(item.createdAt).fromNow()}
      </p>
      <Divider style={{ margin: "0.5rem 0" }} />
      <Box className={classes.buttonContainer}>
        <Button variant="contained" size="small" color="primary">
          Edit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          style={{ marginLeft: "0.25rem" }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default InstockItemCard;
