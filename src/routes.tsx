import React from 'react';
import { Switch } from 'react-router';
import AuthRoute from './components/AuthedRoute';
import { App } from './scenes/App/App';
import Login from './scenes/Login';
import { RouteFront } from './utils/properties';

/**
 * Define the routes of the app
 */
export const Routes: React.FC = () => (
    <Switch>
        <AuthRoute exact path={RouteFront.HOME} component={App} shouldBe={true} />
        <AuthRoute exact path={RouteFront.LOGIN} component={Login} shouldBe={false} />
    </Switch>
);
