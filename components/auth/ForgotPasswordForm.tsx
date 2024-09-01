import { Spacer } from '@nextui-org/react';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import FormProvider from '@/components/common/FormProvider';
import ControllerTextField from '@/components/common/ControllerTextField';
import Button from '@/components/common/Button';

const ForgotPasswordForm = () => {
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (formData: object) => {
    console.log(formData);
  };

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <label>Email</label>
          <ControllerTextField
            label='Enter your email'
            name='email'
            type='text'
          />

          <Spacer y={3} />

          <Button
            type='submit'
            className='w-full'>
            Submit
          </Button>
        </div>
      </FormProvider>
    </>
  );
};

export default ForgotPasswordForm;
