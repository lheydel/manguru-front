import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ApplicationState } from '../../services/common/app.state';
import userActions from '../../services/user/actions/user.actions';
import { UserLoginState } from '../../services/user/reducers/user.states';
import { Language } from '../../utils/properties';
import { Trans, Plural, DateFormat, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import i18nActions from '../../services/i18n/actions/i18n.actions';

export interface AppProps {
  loginState: UserLoginState;
  login: typeof userActions.loginRequest;
  changeLanguage: typeof i18nActions.changeLanguage;
}

export class RawApp extends React.Component<AppProps> {
  private login() {
    const { loginState } = this.props;
    if (!loginState.loading && !loginState.logged) {
      console.log('loading: ' + this.props.loginState.loading);
      this.props.login('blblbl@gmail.com', 'blblbl');
    }
  }

  public render() {
    // this.login();
    const name = this.props.loginState.logged ? 'blblbl' : 'unknown person';
    return (<div className='App'>
      <header className='App-header'>
        <h1 style={{color: 'red', fontSize: 150, marginTop: '50px'}}>
          <Trans>Hello <small>{name}</small>! How are <i>you</i>?</Trans>
        </h1>
        <button onClick={this.login.bind(this)}>Login</button>
        <button onClick={() => this.props.changeLanguage(Language.FR)}>FR</button>
        <button onClick={() => this.props.changeLanguage(Language.EN)}>EN</button>
        <Plural
          value = {666}
          _0 = 'There is no banana :('
          _666 = 'MOUHAHAHAHA I got my # bananas!!'
          one = 'Well, at leat we have one banana...'
          other = 'Look at all those bananas! We have at least # of them!!!!'
        />
        <small>
          <Trans>Today: <DateFormat value={new Date()} /></Trans>
        </small>
        <I18n>{ ({ i18n }) => (
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
    login: (email: string, password: string) => dispatch(userActions.loginRequest(email, password)),
    changeLanguage: (language: Language) => dispatch(i18nActions.changeLanguage(language))
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(RawApp);
