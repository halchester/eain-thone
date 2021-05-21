import React from "react";
import { Route, Redirect } from "react-router-dom";

// Hooks
// import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        console.log("asdf") ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
