import React from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import DatePicker from './DatePicker';
import ComponentProps from '@/types/component/common/controllerDatePicker';

const ControllerDatePicker: React.FC<ComponentProps> = ({ name, ...rest }) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          value={field.value}
          defaultDate={field.value}
          isInvalid={!!error}
          placeHolder={'select'}
          errorMessage={error?.message}
          onChange={(date?: Date | null) => {
            if (date) field.onChange(date);
          }}
          onBlur={() => {
            field.onBlur();
          }}
          {...rest}
        />
      )}
    />
  );
};

export default ControllerDatePicker;
