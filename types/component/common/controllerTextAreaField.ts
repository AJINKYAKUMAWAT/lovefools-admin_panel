import TextAreaFieldProps from './textAreaField';

type ControllerTextAreaFieldProps = { name: string } & Omit<
  TextAreaFieldProps,
  'ref'
>;

export default ControllerTextAreaFieldProps;
