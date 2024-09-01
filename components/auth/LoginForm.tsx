import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Spacer } from '@nextui-org/react';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '@/components/common/FormProvider';
import ControllerTextField from '@/components/common/ControllerTextField';
import Button from '@/components/common/Button';
import { useAppDispatch } from '@/redux/selector';
import { handleLogin } from '@/redux/auth/auth-slice';
import { showNotification } from '@/redux/notification/notification-slice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { LoginFormData } from '@/types/login';
import { ERROR_MESSAGES } from '@/utils/constant';
import { moveToNextPage } from '@/utils/Deeplink';
import { CustomError } from '@/types/errorMessage';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email must be a valid email address',
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      ),
  });

  const defaultValues: LoginFormData = {
    email: '',
    password: '',
  };

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<LoginFormData> = async (credentials) => {
    try {
      await dispatch(handleLogin(credentials));
      moveToNextPage(router);
    } catch (error) {
      let errorMessage: CustomError | undefined;
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.INVALID_CREDENTIALS,
            variant: 'error',
          }),
        );
      } else {
        errorMessage = error as CustomError;
        dispatch(
          showNotification({
            message: errorMessage
              ? errorMessage.message
              : ERROR_MESSAGES.INVALID_CREDENTIALS,
            variant: 'error',
          }),
        );
      }
    }
  };

  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <ControllerTextField
          name='email'
          placeholder='Enter your email'
          type='email'
        />
        <Spacer y={4} />

        <label>Password</label>
        <ControllerTextField
          name='password'
          placeholder='Enter your password'
          type={isVisible ? 'text' : 'password'}
          endContent={
            isVisible ? (
              <EyeIcon
                className='w-5 cursor-pointer'
                onClick={toggleVisibility}
              />
            ) : (
              <EyeSlashIcon
                className='w-5 cursor-pointer'
                onClick={toggleVisibility}
              />
            )
          }
        />

        <div className='my-2 text-sm text-blue-600 hover:underline'>
          {/* <Link href={'/forgot-password'}>Forgot Password?</Link> */}
        </div>

        <Spacer y={3} />

        <Button
          type='submit'
          className='w-full'
          isLoading={isSubmitting}>
          Login
        </Button>
      </FormProvider>
    </>
  );
};

export default LoginForm;
