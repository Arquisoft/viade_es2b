import React, { Fragment } from "react";
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from "@layouts";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";

import {
  Login,
  Register,
  PageNotFound,
  Home,
  RegistrationSuccess,
  Friends,
  Profile
} from "./containers";

const privateRoutes = [
  {
    id: "home",
    path: "/home",
    component: Home
  },
  {
    id: "profile",
    path: "/profile",
    component: Profile
  },
  {
    id: "friends",
    path: "/friends",
    component: Friends
  }
];

/* 
 */
const Routes = () => {
  return (
  <Router basename="/">
    <Fragment>
      <Switch>
        <NotLoggedInLayout path="/" exact component={Login} />
        <NotLoggedInLayout path="/register" exact component={Register} />
        <NotLoggedInLayout path="/register/success" exact component={RegistrationSuccess} />
        <PublicLayout path="/404" exact component={PageNotFound} />
        <Redirect from="/" to="/home" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
  );
};

export default Routes;
