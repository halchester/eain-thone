import React from "react";
import { Box, Button, Card, makeStyles, Typography } from "@material-ui/core";
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

  return (
    <Card elevation={3} className={classes.root}>
      <Box className={classes.container}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h6">
          Total : <strong>{item.quantity}</strong>
        </Typography>
      </Box>
      <p className="text-sm text-gray-500">
        {moment(item.createdAt).fromNow()}
      </p>
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
