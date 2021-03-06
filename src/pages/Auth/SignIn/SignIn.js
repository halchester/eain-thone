import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Formik } from "formik";
import { signInUser } from "../../../store/actions/auth.actions";
import * as actionTypes from "../../../store/acionTypes";
// Styling and utils
import AuthStyles, { signinInitialValues } from "../AuthStyles";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const classes = AuthStyles();
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: actionTypes.CLEAR_MESSAGE });
    // eslint-disable-next-line
  }, []);

  if (auth.token) {
    history.push("/");
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Sign In
      </Typography>
      <Formik
        initialValues={signinInitialValues}
        onSubmit={async (values) => {
          const payload = {
            username: values.username,
            password: values.password,
          };
          dispatch(signInUser(payload));
        }}
      >
        {({ values, handleChange, errors, handleSubmit }) => (
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
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={handleSubmit}
              color="secondary"
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

      <Box className={classes.footer}>
        <a href="/about">
          <Typography
            align="center"
            variant="h5"
            style={{ textDecoration: "underline" }}
            color="secondary"
          >
            About Eain Thone
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

export default SignIn;
