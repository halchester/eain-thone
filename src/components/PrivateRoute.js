import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuth } from "../utils/auth";

// Hooks
// import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
