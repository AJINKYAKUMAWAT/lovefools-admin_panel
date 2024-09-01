import TextFieldProps from './textField';

type ControllerTextFieldProps = { name: string; variantType?: string } & Omit<
  TextFieldProps,
  'ref'
>;

export default ControllerTextFieldProps;
