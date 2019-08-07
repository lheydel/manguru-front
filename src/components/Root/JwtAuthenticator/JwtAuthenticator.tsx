import React from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { UserLoginState } from '../../../services/user/reducers/user.states';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../services/common/app.states';
import userActionners from '../../../services/user/actions/user.actionners';
import { Cookie } from '../../../utils/properties';

export interface JwtAuthenticatorProps {
    cookies: Cookies;
    loginJwt: typeof userActionners.loginJwtRequest;
    loginState: UserLoginState;
}

/**
 * Ensure that a user always stays authenticated if a JWT is set in its cookies
 */
export const RawJwtAuthenticator: React.FC<JwtAuthenticatorProps> = (props) => {
    const { cookies, loginJwt } = props;
    const { logged, error, loading } = props.loginState;

    // if user not logged but has an Authorization cookie, try to authenticate him
    if (!logged && !error && cookies.get(Cookie.AUTH)) {
        if (!loading) {
            loginJwt();
        }
        return null;
    } // else

    return <React.Fragment>{props.children}</React.Fragment>;
};

const mapStateToProps = (state: ApplicationState) => ({
    loginState: state.user.login
});

const mapDispatchToProps = (dispatch: Function) => ({
    loginJwt: () => dispatch(userActionners.loginJwtRequest()),
});

export const JwtAuthenticator = withCookies(connect(mapStateToProps, mapDispatchToProps)(RawJwtAuthenticator));
