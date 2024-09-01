import { TextAreaProps } from '@nextui-org/react';

type TextAreaFieldProps = {
  onChange?: (value: string) => void;
} & Omit<TextAreaProps, 'onChange'>;

export default TextAreaFieldProps;
