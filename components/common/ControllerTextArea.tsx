import React from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import TextAreaField from './TextAreaField';
import ComponentProps from '@/types/component/common/controllerTextAreaField';

const ControllerTextArea: React.FC<ComponentProps> = ({ name, ...rest }) => {
  const { control } = useFormContext<FieldValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextAreaField
          isInvalid={error ? true : false}
          errorMessage={error?.message}
          {...rest}
          {...field}
        />
      )}
    />
  );
};

export default ControllerTextArea;
