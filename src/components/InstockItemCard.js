import React from "react";
import { Box, Card, makeStyles, Typography } from "@material-ui/core";
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
});

const InstockItemCard = ({ item }) => {
  console.log(item);
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
    </Card>
  );
};

export default InstockItemCard;
