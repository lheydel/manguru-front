import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface AuthedRouteProps extends RouteProps {
    component: any;
}

export const AuthedRoute: React.FC<AuthedRouteProps> = ({component: Child, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Child {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);
