import React from 'react';
import Select from './Select';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import ComponentProps from '@/types/component/common/ControllerSelects';

const ControllerSelect: React.FC<ComponentProps> = ({
  name,
  placeholder,
  options,
  multiple = false,
  handleInputChange,
  ...rest
}) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          placeholder={placeholder}
          options={options}
          isMulti={multiple}
          handleInputChange={handleInputChange}
          isInvalid={!!error}
          errorMessage={error?.message}
          {...field}
          {...rest}
        />
      )}
    />
  );
};

export default ControllerSelect;
