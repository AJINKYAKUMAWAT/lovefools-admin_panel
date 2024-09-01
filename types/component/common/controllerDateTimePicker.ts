import DateTimePickerProps from './dateTimePicker';

type ControllerDatePickerProps = { name: string } & Omit<
  DateTimePickerProps,
  'onChange'
>;

export default ControllerDatePickerProps;
