import { DatePickerProps } from '@nextui-org/react';

export default interface DateTimePickerProps extends DatePickerProps {
  placeHolder?: string;
  defaultDate?: Date | null;
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  label?: string;
  showTimePicker?: boolean;
}
