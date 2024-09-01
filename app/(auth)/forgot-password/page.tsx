'use client';

import { Spacer } from '@nextui-org/react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Card from '@/components/common/Card';

const ForgotPassword = () => {
  return (
    <div className='flex h-full w-full justify-center md:items-center'>
      <Card className='w-unit-8xl p-8'>
        <div className='text-center text-2xl font-semibold'>
          Forgot Password
        </div>
        <Spacer y={6} />
        <ForgotPasswordForm />
      </Card>
    </div>
  );
};

export default ForgotPassword;
