export default interface DatePickerProps {
  value?: Date;
  placeHolder?: string;
  defaultDate?: Date | null;
  maxDate?: Date;
  minDate?: Date;
  disabledDates?: Date[];
  isInvalid?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  onChange: (date: Date) => void;
  onBlur?: () => void;
  label?: string;
}
