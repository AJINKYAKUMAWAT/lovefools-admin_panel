import { InputProps } from '@nextui-org/react';

type TextFieldProps = {
  onChange?: (value: string) => void;
  variantType?: string;
} & Omit<InputProps, 'onChange'>;

export default TextFieldProps;
