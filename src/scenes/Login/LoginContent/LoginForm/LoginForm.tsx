import { I18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import { FormControlLabel } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Form, Formik, FormikActions } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Field from '../../../../components/Field';
import i18nService from '../../../../services/i18n/service/i18n.service';
import userActionners from '../../../../services/user/actions/user.actionners';

export interface LoginFormProps {
  login: typeof userActionners.loginRequest;
}

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const initialLoginFormValues: LoginFormValues = {
  email: '',
  password: '',
  rememberMe: false,
};

const loginSchema = (i18n: I18n) => Yup.object().shape({
  email: Yup.string()
    .email(i18n._(t`Please enter a valid email`))
    .required(i18n._(t`Please enter the email associated with your account`)),
  password: Yup.string()
    .required(i18n._(t`Please enter your password`)),
});

export const RawLoginForm: React.FC<LoginFormProps> = (props) => {
  const i18n = i18nService.i18n;
  return (
    <Formik
      initialValues={initialLoginFormValues}
      validationSchema={loginSchema(i18n)}
      validateOnBlur
      onSubmit={(values: LoginFormValues, actions: FormikActions<LoginFormValues>) => {
        props.login(values.email, values.password, values.rememberMe);
        // alert(`${values.email}, ${values.password}, ${values.rememberMe}`);
        actions.setSubmitting(false);
      }}
      render={(formProps) => (
        <Form noValidate> {/* deactivate html validation */}
          {/* Email */}
          <Box mb={2}>
            <Field fieldType='text'
              name='email' type='email' label={i18n._(t`Email`)}
              variant='outlined' fullWidth formikProps={formProps}
            />
          </Box>
          {/* Password */}
          <Box mb={2}>
            <Field fieldType='text'
              name='password' type='password' label={i18n._(t`Password`)}
              variant='outlined' fullWidth formikProps={formProps}
            />
          </Box>
          {/* Remember me */}
          <FormControlLabel
            label={i18n._(t`Remember me`)}
            control={
              <Field fieldType='checkbox'
                name='rememberMe'
                color='primary'
                formikProps={formProps}
              />
            }
          />
          {/* Submit */}
          <Button variant='contained' color='primary' type='submit' fullWidth>
            <Trans>Sign in</Trans>
          </Button>
        </Form>
      )}
    />
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (email: string, password: string, rememberMe: boolean) =>
            dispatch(userActionners.loginRequest(email, password, rememberMe)),
  };
};

export const LoginForm = connect(null, mapDispatchToProps)(RawLoginForm);
