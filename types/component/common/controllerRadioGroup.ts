import RadioGroupProps from './radioGroup';

type ControllerRadioGroupProps = { name: string } & Omit<
  RadioGroupProps,
  'ref'
>;

export default ControllerRadioGroupProps;
