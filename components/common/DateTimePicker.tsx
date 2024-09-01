import { DatePicker } from '@nextui-org/react';
import ComponentProps from '@/types/component/common/dateTimePicker';
import { DateValue } from '@internationalized/date';

const DateTimePicker: React.FC<ComponentProps> = ({
  isRequired = false,
  isInvalid,
  errorMessage,
  onChange,
  label = '',
  showTimePicker = false,
  value,
  ...rest
}) => {
  return (
    <div className='flex w-full flex-row gap-4'>
      <DatePicker
        granularity={showTimePicker ? 'second' : 'day'}
        label={label}
        variant='bordered'
        hideTimeZone
        showMonthAndYearPickers
        value={value}
        labelPlacement='outside'
        isRequired={isRequired}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        onChange={(date: DateValue | null) => {
          if (onChange) {
            if (date) onChange(date);
          }
        }}
        {...rest}
      />
    </div>
  );
};

export default DateTimePicker;
