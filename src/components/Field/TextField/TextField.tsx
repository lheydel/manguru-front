import React from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';

export interface TextFieldProps {
  name: string;
  errors: FormikProps<any>['errors'];
  touched: FormikProps<any>['touched'];
  values: FormikProps<any>['values'];
  handleBlur: FormikProps<any>['handleBlur'];
  handleChange: FormikProps<any>['handleChange'];
}

/**
 * Combine Material-UI TextField design with Formik functionnalities
 */
export const TextField: React.FC<TextFieldProps & MuiTextFieldProps> = ({
  name,
  errors,
  touched,
  values,
  handleBlur,
  handleChange,
  ...props
}) => (
  <MuiTextField
    name={name}
    error={!!errors[name] && !!touched[name]}
    helperText={touched[name] && errors[name]}
    value={values[name]}
    onChange={handleChange}
    onBlur={handleBlur}
    {...props}
  />
);
