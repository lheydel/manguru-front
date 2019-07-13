import React from 'react';
import { Switch, Route } from 'react-router';
import AuthedRoute from './components/AuthedRoute/';
import { App } from './scenes/App/App';

export const Routes: React.SFC = () => (
  <Switch>
    <Route exact path='/' component={App} />
    <AuthedRoute path='/home' component={App} />
  </Switch>
);
