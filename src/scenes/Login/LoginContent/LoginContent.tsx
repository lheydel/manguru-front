import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../services/common/app.states';
import { UserLoginState } from '../../../services/user/reducers/user.states';
import LoginForm from './LoginForm';
import Alert from '../../../components/Alert';

export interface LoginContentProps {
  loginErr: UserLoginState['error'];
}

/**
 * Specific content of the login page
 */
export const RawLoginContent: React.FC<LoginContentProps> = ({ loginErr }) => (
  <Container maxWidth='sm'>
    <Card elevation={2}>
      <CardHeader title='Login' style={{textAlign: 'center'}}/>
      {/* <h1 style={{textAlign: 'center'}}>Login </h1> */}
      <CardContent>
        {loginErr && <Alert variant='danger' mb={2}><i>{loginErr}</i></Alert>}
        <LoginForm />
      </CardContent>
    </Card>
  </Container>
);

const mapStateToProps = (state: ApplicationState) => ({
  loginErr: state.user.login.error,
});

export const LoginContent = connect(mapStateToProps)(RawLoginContent);
