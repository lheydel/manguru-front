import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ApplicationState } from '../../services/common/app.state';
import { connect } from 'react-redux';

export interface AuthedRouteProps extends RouteProps {
  component: any;
  logged: boolean;
}

const RawAuthedRoute: React.FC<AuthedRouteProps> = ({component: Child, logged, ...rest }) => (
  <Route {...rest} render={props => (
    logged
      ? <Child {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
);

const mapStateToProps = (state: ApplicationState) => {
  return {
    logged: state.user.login.logged
  };
};

export const AuthedRoute = connect(mapStateToProps)(RawAuthedRoute);
