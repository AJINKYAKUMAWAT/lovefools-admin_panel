import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';

export default interface FormProvider<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | SubmitHandler<T>;
}
