import React from 'react';
import { Route, Switch } from 'react-router';
import AuthRoute from './components/AuthedRoute';
import { App } from './scenes/App/App';

export const Routes: React.SFC = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={App} />
        <AuthRoute path='/home' component={App} />
    </Switch>
);
