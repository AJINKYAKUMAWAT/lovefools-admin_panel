import DatePickerProps from './datePicker';

type ControllerDatePickerProps = { name: string } & Omit<
  DatePickerProps,
  'onChange'
>;

export default ControllerDatePickerProps;
