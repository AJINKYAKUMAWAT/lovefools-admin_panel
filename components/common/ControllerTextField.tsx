import React, { forwardRef } from 'react';
import TextField from './TextField';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import ComponentProps from '@/types/component/common/controllerTextField';

const ControllerTextField: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ComponentProps
> = ({ name, onChange, variantType, ...rest }) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variantType={variantType}
          isInvalid={error ? true : false}
          errorMessage={error?.message}
          {...field}
          {...rest}
          onChange={(e: string) => {
            field.onChange(e);
            if (onChange) {
              onChange(e);
            }
          }}
        />
      )}
    />
  );
};

export default forwardRef(ControllerTextField);
