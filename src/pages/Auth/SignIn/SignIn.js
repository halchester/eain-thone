import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";

// Styling and utils
import AuthStyles, { signinInitialValues } from "../AuthStyles";
import { Link } from "react-router-dom";

const SignIn = () => {
  const classes = AuthStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom>
        Sign In
      </Typography>
      <Formik
        initialValues={signinInitialValues}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, errors, handleSubmit }) => (
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <TextField
              id="username"
              variant="filled"
              value={values.username}
              onChange={handleChange}
              fullWidth
              className={classes.input}
              label="Username"
              type="username"
            />
            <TextField
              id="password"
              variant="filled"
              value={values.password}
              onChange={handleChange}
              fullWidth
              className={classes.input}
              label="Password"
              type="password"
            />
            <Button
              variant="outlined"
              fullWidth
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </form>
        )}
      </Formik>
      <Typography align="center" variant="body1" gutterBottom>
        Doesn't have an account ?
      </Typography>
      <Typography align="center" variant="h6">
        <Link to="/register" className={classes.link}>
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
