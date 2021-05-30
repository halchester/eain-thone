import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "1.5rem",
  },
  linksContainer: {
    maxWidth: "300px",
    margin: "0 auto",
    marginTop: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textDecoration: "underline",
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 30,
    width: "100%",
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h5" gutterBottom color="secondary">
        <strong>About Eain Thone</strong>
      </Typography>
      <Typography variant="body1">
        Eain thone is a web app mainly for personal-use for my mother. She wants
        to keep track of what's in home's fridge so this is for her. She can
        also add to-buy items to a shopping cart.
      </Typography>
      <Box className={classes.linksContainer}>
        <a href="https://github.com/halchester/eain-thone">
          <Typography display="inline" variant="h6" color="primary">
            Github
          </Typography>
        </a>
        <a href="https://twitter.com/halChester02">
          <Typography display="inline" variant="h6" color="primary">
            Twitter
          </Typography>
        </a>
        <a href="https://buymeacoffee.com/halchester">
          <Typography display="inline" variant="h6" color="primary">
            Support
          </Typography>
        </a>
      </Box>
      <Box className={classes.footer}>
        <Typography align="center" variant="h6">
          Chester &#169; 2021
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
