import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ApplicationState } from '../../services/common/app.state';
import { connect } from 'react-redux';
import { UserLoginState } from '../../services/user/reducers/user.states';
import { Cookies, withCookies } from 'react-cookie';
import { Cookie } from '../../utils/properties';
import userActionners from '../../services/user/actions/user.actionners';

export interface AuthedRouteProps extends RouteProps {
  component: any;
  cookies: Cookies;
  loginJwt: typeof userActionners.loginJwtRequest;
  loginState: UserLoginState;
}

export const RawAuthedRoute: React.FC<AuthedRouteProps> = ({
    component: Child,
    loginState: { logged, loading, error },
    loginState,
    cookies,
    loginJwt,
    ...rest
}) => {

    // if user not logged but has an Authorization cookie, try to authenticate him
    if (!logged && !error && cookies.get(Cookie.AUTH)) {
        if (!loading) {
            loginJwt();
        }
        return null;
    } // else

    console.log(loginState);

    return (
        <Route {...rest} render={props => (
            logged
            ? <Child {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    loginState: state.user.login
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    loginJwt: () => dispatch(userActionners.loginJwtRequest()),
  };
};

export const AuthedRoute = withCookies(connect(mapStateToProps, mapDispatchToProps)(RawAuthedRoute));
