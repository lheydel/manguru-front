import { Box } from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box';
import React from 'react';
import style from './style';

export interface AlertProps {
  variant: 'danger';
}

/**
 * Display a message within a colored block
 */
export const Alert: React.FC<AlertProps & BoxProps> = ({ children, variant, ...props }) => {
  const classes = style();

  return (
    <Box
      className={classes[variant]}
      border={1}
      {...props}
    >
      {children}
    </Box>
  );
};
