import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CustomAppbar from "../../components/CustomAppbar";

const useStyles = makeStyles({
  root: {
    margin: "1rem",
  },
});

function ToBuy() {
  const classes = useStyles();
  return (
    <Box>
      <CustomAppbar name="To Buy" />
      <Box className={classes.root}>
        <Typography>To buy</Typography>
      </Box>
    </Box>
  );
}

export default ToBuy;
