import { Form, Formik, FormikActions, Field, ErrorMessage } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import userActionners from '../../../services/user/actions/user.actionners';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';

export interface LoginFormProps {
    login: typeof userActionners.loginRequest;
}

interface LoginFormValues {
    email: string;
    password: string;
}

const initialLoginFormValues: LoginFormValues = {
    email: '',
    password: '',
};

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too short')
        .max(70, 'Too long')
        .required('Required'),
    password: Yup.string()
        .min(3, 'Too short')
        .max(70, 'Too long')
        .required('Required'),
});

export const RawLoginForm: React.FC<LoginFormProps> = (props) => (
    <Formik
        initialValues={initialLoginFormValues}
        validationSchema={loginSchema}
        onSubmit={(values: LoginFormValues, actions: FormikActions<LoginFormValues>) => {
            props.login(values.email, values.password, true);
            actions.setSubmitting(false);
        }}
        render={() => (
            <Form>
                <Field type='email' name='email' placeholder='example' />
                <ErrorMessage name='email' />
                <Field type='password' name='password' placeholder='example' />
                <ErrorMessage name='password' />
                <Button variant='contained' color='secondary' type='submit'>Submit</Button>
            </Form>
        )}
    />
);

const mapDispatchToProps = (dispatch: Function) => {
    return {
        login: (email: string, password: string, rememberMe: boolean) =>
                dispatch(userActionners.loginRequest(email, password, rememberMe)),
    };
};

export const LoginForm = connect(null, mapDispatchToProps)(RawLoginForm);
