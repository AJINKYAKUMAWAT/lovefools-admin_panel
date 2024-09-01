import React from 'react';
import { FormProvider as Form, FieldValues } from 'react-hook-form';
import ComponentProps from '@/types/component/common/formProvider';

const FormProvider = <T extends FieldValues>({
  children,
  onSubmit,
  methods,
  ...rest
}: ComponentProps<T>) => {
  return (
    <Form
      {...methods}
      {...rest}>
      <form onSubmit={onSubmit as React.FormEventHandler<HTMLFormElement>}>
        {children}
      </form>
    </Form>
  );
};

export default FormProvider;
