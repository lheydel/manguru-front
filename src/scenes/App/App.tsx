import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ApplicationState } from '../../services/common/app.state';
import userActions from '../../services/user/actions/user.actions';
import { UserLoginState } from '../../services/user/reducers/user.states';
import { RouteComponentProps } from 'react-router';

const mapStateToProps = (state: ApplicationState) => {
  return {
    loginState: state.user.login
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (email: string, password: string) => dispatch(userActions.loginRequest(email, password))
  };
};

interface Props {
  loginState: UserLoginState;
  login: Function;
}

class RawApp extends React.Component<Props & RouteComponentProps> {
  private login() {
    const { loginState } = this.props;
    if (!loginState.loading && !loginState.logged) {
      console.log('loading: ' + this.props.loginState.loading);
      this.props.login('blblbl@gmail.com', 'blblbl');
    }
  }

  public render() {
    this.login();
    return (<div className='App'>
      <header className='App-header'>
        <h1 style={{color: 'red', fontSize: 150, marginTop: '50px'}}>
          PD.
        </h1>
      </header>
    </div>);
  }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(RawApp);
