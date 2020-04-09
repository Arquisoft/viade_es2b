import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  Login,
  Register,
  PageNotFound,
  Home,
  RegistrationSuccess,
  Profile,
} from './containers';

const privateRoutes = [
  {
    id: 'home',
    path: '/home',
    component: Home
  },
  {
    id: 'profile',
    path: '/profile',
    component: Profile
  }
];

const Routes = () => {
  return (
  <Router basename="/">
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/login" exact />
        <NotLoggedInLayout component={Register} path="/register" exact />
        <NotLoggedInLayout path="/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/404" component={PageNotFound} exact />
        <Redirect from="/" to="/home" exact />
        <PrivateLayout path="/" routes={privateRoutes} />
        <Redirect to="/404" />
      </Switch>
    </Fragment>
  </Router>
  );
};

export default Routes;
