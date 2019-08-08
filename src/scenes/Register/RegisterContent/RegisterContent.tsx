import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import React from 'react';
import Alert from '../../../components/Alert';
import { UserRegisterState } from '../../../services/user/reducers/user.states';
import RegisterForm from './RegisterForm';
import { ApplicationState } from '../../../services/common/app.states';
import { connect } from 'react-redux';

export interface RegisterContentProps {
  registerErr: UserRegisterState['error'];
}

/**
 * Specific content of the registration page
 */
export const RawRegisterContent: React.FC<RegisterContentProps> = ({ registerErr }) => (
  <Container maxWidth='sm'>
    <Card elevation={2}>
      <CardHeader title='Register' style={{textAlign: 'center'}}/>
      <CardContent>
        {registerErr && <Alert variant='danger' mb={2}><i>{registerErr}</i></Alert>}
        <RegisterForm />
      </CardContent>
    </Card>
  </Container>
);

const mapStateToProps = (state: ApplicationState) => ({
  registerErr: state.user.register.error,
});

export const RegisterContent = connect(mapStateToProps)(RawRegisterContent);
