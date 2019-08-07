import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { FormikProps } from 'formik';
import React from 'react';

export interface CheckboxProps {
  name: string;
  values: FormikProps<any>['values'];
  handleChange: FormikProps<any>['handleChange'];
}

/**
 * Combine Material-UI Checkbox design with Formik functionnalities
 */
export const Checkbox: React.FC<CheckboxProps & MuiCheckboxProps> = ({
  name,
  values,
  handleChange,
  ...props
}) => (
  <MuiCheckbox
    name={name}
    value={values[name]}
    onChange={handleChange}
    {...props}
  />
);
