import React from 'react';
import { CheckboxProps, Checkbox as NextUICheckbox } from '@nextui-org/react';

const Checkbox: React.FC<CheckboxProps> = ({ children, ...rest }) => {
  return <NextUICheckbox {...rest}>{children}</NextUICheckbox>;
};

export default Checkbox;
