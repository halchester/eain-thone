import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import { registerUser } from "../../../store/actions/auth.actions";
import * as actionTypes from "../../../store/acionTypes";

// Styling and utils
import AuthStyles, { registerInitialValues } from "../AuthStyles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const classes = AuthStyles();
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: actionTypes.CLEAR_MESSAGE });
    // eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Register
      </Typography>
      <Formik
        initialValues={registerInitialValues}
        onSubmit={async (values) => {
          const payload = {
            username: values.username,
            password: values.password,
          };
          dispatch(registerUser(payload));
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            {ui.isLoading ? (
              <CircularProgress style={{ margin: "1rem" }} />
            ) : null}
            {auth.message.length > 0 ? (
              <Typography align="center" className={classes.input}>
                <strong>{auth.message}</strong>
              </Typography>
            ) : null}
            <TextField
              id="username"
              variant="filled"
              value={values.username}
              onChange={handleChange}
              fullWidth
              className={classes.input}
              label="Username"
              type="username"
              color="primary"
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
              color="primary"
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
              color="primary"
            />
            <Button
              variant="contained"
              fullWidth
              color="secondary"
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
