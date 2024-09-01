import React from 'react';
import RadioGroup from './RadioGroup';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import ComponentProps from '@/types/component/common/controllerRadioGroup';

const ControllerRadioButton: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ComponentProps
> = ({ name, ...rest }) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <RadioGroup
          isInvalid={error ? true : false}
          errorMessage={error?.message}
          {...field}
          {...rest}
        />
      )}
    />
  );
};

export default ControllerRadioButton;
