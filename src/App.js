import React from "react";
import { Route, Switch } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Auth/Register/Register";
import SignIn from "./pages/Auth/SignIn/SignIn";
import Home from "./pages/Home/Home";
import ToBuy from "./pages/ToBuy/ToBuy";

const App = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/signin" component={SignIn} />

      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/tobuy" component={ToBuy} />
    </Switch>
  );
};

export default App;
