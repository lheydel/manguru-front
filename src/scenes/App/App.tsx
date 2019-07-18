import { DateFormat, Plural, t, Trans } from '@lingui/macro';
import { I18n } from '@lingui/react';
import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { ApplicationState } from '../../services/common/app.state';
import i18nActions from '../../services/i18n/actions/i18n.actionners';
import userActions from '../../services/user/actions/user.actionners';
import { UserLoginState } from '../../services/user/reducers/user.states';
import { Language, Cookie } from '../../utils/properties';
import './App.css';

export interface AppProps {
    cookies: Cookies;
    changeLanguage: typeof i18nActions.changeLanguage;
    login: typeof userActions.loginRequest;
    loginJwt: typeof userActions.loginJwtRequest;
    loginState: UserLoginState;
}

export class RawApp extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props);
        this.login = this.login.bind(this);
        this.loginJwt = this.loginJwt.bind(this);
    }

    private login() {
        const { loginState, login } = this.props;
        if (!loginState.loading && !loginState.logged) {
            console.log('loading: ' + loginState.loading);
            login('annie@macion.com', 'aze', true);
        }
    }

    private loginJwt() {
        const { loginState, cookies, loginJwt } = this.props;
        if (!loginState.loading && !loginState.logged) {
            if (localStorage.getItem(Cookie.AUTH) || cookies.get(Cookie.AUTH)) {
                loginJwt();
            }
        }
    }

    public render() {
        this.loginJwt();
        const name = this.props.loginState.logged ? this.props.loginState.user.email : 'unknown person';
        return (<div className='App'>
            <header className='App-header'>
                <h1 style={{ color: 'red', fontSize: 150, marginTop: '50px' }}>
                    <Trans>Hello <small>{name}</small>! How are <i>you</i>?</Trans>
                </h1>
                <button onClick={this.login}>Login</button>
                <button onClick={() => this.props.changeLanguage(Language.FR)}>FR</button>
                <button onClick={() => this.props.changeLanguage(Language.EN)}>EN</button>
                <Plural
                    value={666}
                    _0='There is no banana :('
                    _666='MOUHAHAHAHA I got my # bananas!!'
                    one='Well, at leat we have one banana...'
                    other='Look at all those bananas! We have at least # of them!!!!'
                />
                <small>
                    <Trans>Today: <DateFormat value={new Date()} /></Trans>
                </small>
                <I18n>{({ i18n }) => (
                    <input type='text' placeholder={i18n._(t`This is a test`)} />
                )}</I18n>
            </header>
        </div>);
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        loginState: state.user.login
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        login: (email: string, password: string, rememberMe: boolean) => dispatch(userActions.loginRequest(email, password, rememberMe)),
        loginJwt: () => dispatch(userActions.loginJwtRequest()),
        changeLanguage: (language: Language) => dispatch(i18nActions.changeLanguage(language))
    };
};

export const App = withCookies(connect(mapStateToProps, mapDispatchToProps)(RawApp));
