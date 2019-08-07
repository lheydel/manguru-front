import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ApplicationState } from '../../services/common/app.states';
import { RouteFront } from '../../utils/properties';

export interface RawAuthRouteProps extends RouteProps {
    /** The component to display */
    component: React.ComponentType<any>;

    /**
     * Specify if the user should be or should not be logged
     * (if either 'should' or 'should not' is okay, user Route from react-router instead)
     */
    shouldBe: boolean;
}

export interface AuthRouteProps extends RawAuthRouteProps {
  logged: boolean;
}

/**
 * Ensure that the user is (or is not) authenticated before accessing a given component
 */
export const RawAuthRoute: React.FC<AuthRouteProps> = ({
    component: Child,
    logged,
    shouldBe,
    ...rest
}) => {
    const redirection = shouldBe ? RouteFront.LOGIN : RouteFront.HOME;
    return (
        <Route {...rest} render={routeProps => (
            (logged && shouldBe) || (!logged && !shouldBe)
            ? <Child {...routeProps} />
            : <Redirect to={{ pathname: redirection, state: { from: routeProps.location } }} />
        )} />
    );
};

const mapStateToProps = (state: ApplicationState) => ({
    logged: state.user.login.logged,
});

export const AuthRoute = connect(mapStateToProps)(RawAuthRoute);
