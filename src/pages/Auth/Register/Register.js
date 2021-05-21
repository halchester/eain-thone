import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";

// Styling and utils
import AuthStyles, { registerInitialValues } from "../AuthStyles";
import { Link } from "react-router-dom";

function Register() {
  const classes = AuthStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={registerInitialValues}
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
            <TextField
              id="repassword"
              variant="filled"
              value={values.repassword}
              onChange={handleChange}
              fullWidth
              className={classes.input}
              label="Re-enter Password"
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
      <Typography align="center" variant="h6">
        <Link to="/signin" className={classes.link}>
          Sign in!
        </Link>
      </Typography>
    </Box>
  );
}

export default Register;
