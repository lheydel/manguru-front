import { I18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Form, Formik, FormikActions } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Field from '../../../../components/Field';
import i18nService from '../../../../services/i18n/service/i18n.service';
import userActionners from '../../../../services/user/actions/user.actionners';
import { UserConstraint } from '../../../../services/user/user.properties';
import { Grid } from '@material-ui/core';

export interface RegisterFormProps {
  register: typeof userActionners.registerRequest;
}

interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export const initialRegisterFormValues: RegisterFormValues = {
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

const registerSchema = (i18n: I18n) => {
  const validEmail = i18n._(t`Please enter a valid email`);
  const usernameLength = i18n._(t`The username must be between ${UserConstraint.USERNAME_MIN} and
                              ${UserConstraint.USERNAME_MAX} character long`);
  const passwordLength = i18n._(t`The password must be between ${UserConstraint.PASSWORD_MIN} and
                              ${UserConstraint.PASSWORD_MAX} character long`);

  return Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(validEmail)
      .email(validEmail)
      .max(UserConstraint.EMAIL_MAX, i18n._(t`The email must be less than ${UserConstraint.EMAIL_MAX} character long`)),
    username: Yup.string()
      .trim()
      .required(i18n._(t`Please enter a valid username`))
      .min(UserConstraint.USERNAME_MIN, usernameLength)
      .max(UserConstraint.USERNAME_MAX, usernameLength),
    password: Yup.string()
      .required(i18n._(t`Please enter a valid password`))
      .min(UserConstraint.PASSWORD_MIN, passwordLength)
      .max(UserConstraint.PASSWORD_MAX, passwordLength),
    passwordConfirm: Yup.string()
      .required(i18n._(t`Please confirm your password`))
      .oneOf([Yup.ref('password')], i18n._(t`The passwords do not match`)),
  });
};

/**
 * User registration form with full design and functionnalities of the fields
 */
export const RawRegisterForm: React.FC<RegisterFormProps> = (props) => {
  const i18n = i18nService.i18n;
  return (
    <Formik
      initialValues={initialRegisterFormValues}
      validationSchema={registerSchema(i18n)}
      validateOnBlur
      onSubmit={(values: RegisterFormValues, actions: FormikActions<RegisterFormValues>) => {
        props.register(values.email, values.username, values.password);
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
          {/* Username */}
          <Box mb={2}>
            <Field fieldType='text'
              name='username' type='text' label={i18n._(t`Username`)}
              variant='outlined' fullWidth formikProps={formProps}
            />
          </Box>
          {/* Passwords */}
          <Box mb={2}>
            <Grid container spacing={3}>
              {/* Password */}
              <Grid item xs={6}>
                <Field fieldType='text'
                  name='password' type='password' label={i18n._(t`Password`)}
                  variant='outlined' fullWidth formikProps={formProps}
                />
              </Grid>
              {/* Confirm Password */}
              <Grid item xs={6}>
                <Field fieldType='text'
                  name='passwordConfirm' type='password' label={i18n._(t`Confirm Password`)}
                  variant='outlined' fullWidth formikProps={formProps}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Submit */}
          <Button variant='contained' color='primary' type='submit' fullWidth>
            <Trans>Sign up</Trans>
          </Button>
        </Form>
      )}
    />
  );
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    register: (email: string, username: string, password: string) =>
              dispatch(userActionners.registerRequest(email, username, password)),
  };
};

export const RegisterForm = connect(null, mapDispatchToProps)(RawRegisterForm);
