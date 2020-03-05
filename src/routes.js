import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  Login
} from './containers'

const Routes = () => (
    <Router>
      <Fragment>
        <Switch>
          <NotLoggedInLayout component={Login} path="/login" exact />
        </Switch>
      </Fragment>
    </Router>
  );
  
  export default Routes;