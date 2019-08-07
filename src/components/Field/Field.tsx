import { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import React from 'react';
import Checkbox from './Checkbox';
import { TextField } from './TextField';

export interface BaseFieldProps {
  /** The type of component to use e.g. TextField, Checkbox, etc. */
  fieldType: string;

  /** The name of the field in Formik context */
  name: string;

  /** The props provided by <Formik /> on render */
  formikProps: FormikProps<any>;
}

/* TextField */
interface BaseTextFieldProps extends BaseFieldProps {
  fieldType: 'text';
}

export type TextFieldProps = BaseTextFieldProps & MuiTextFieldProps;

/* Checkbox */
interface BaseCheckboxProps extends BaseFieldProps {
  fieldType: 'checkbox';
}

export type CheckboxProps = BaseCheckboxProps & MuiCheckboxProps;

/* Overall */
export type FieldProps = TextFieldProps | CheckboxProps;

/**
 * Combine Material-UI design with Formik functionnalities
 */
export const Field: React.FC<FieldProps> = ({
  name,
  formikProps: {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
  },
  ...props
}) => {
  let formikProps;
  switch (props.fieldType) {
    // TextField
    case 'text':
      delete props.fieldType;
      formikProps = { values, errors, touched, handleBlur, handleChange };
      return (
        <TextField
          name={name}
          {...formikProps}
          {...props}
        />
      );

    // Checkbox
    case 'checkbox':
      delete props.fieldType;
      formikProps = { values, handleChange };
      return (
        <Checkbox
          name={name}
          {...formikProps}
          {...props}
        />
      );

    // Wrong type
    default:
      return null;
  }
};
