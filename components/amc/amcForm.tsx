import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Resolver, useForm } from 'react-hook-form';
import { ERROR_MESSAGES, Roles } from '@/utils/constant';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import { useParams } from 'next/navigation';
import { showNotification } from '@/redux/notification/notification-slice';
import FormProvider from '../common/FormProvider';
import AuthChecker from '../common/AuthChecker';
import { formatDate } from '@/utils/formatTime';
import { formatInput } from '@/utils/utils';
import { AmcInput } from '@/types/amc';
import {
  addAmc,
  updateAmc,
  updateAmcValues,
  updateTab,
} from '@/redux/amc/amcSlice';
import { amcSchema } from '@/schema/amc/amc';
import AmcDetailsForm from './amcDetailsForm';

const AmcForm = () => {
  const { defaultValues } = useAppSelector((state) => state.amc);

  const { id } = useParams();
  const methods = useForm<AmcInput>({
    resolver: yupResolver(amcSchema) as Resolver<AmcInput>,
    defaultValues: defaultValues ?? {},
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (amcData: AmcInput) => {
    try {
      const Amount = String(amcData.amount).replaceAll(',', '');
      const amcObj = {
        serviceName: amcData.serviceName,
        serviceCompanyName: amcData.serviceCompanyName,
        startDate: amcData.startDate ? formatDate(amcData.startDate) : null,
        endDate: amcData.endDate ? formatDate(amcData.endDate) : null,
        amount: Number(Amount),
      };

      const defaultAmount = String(amcData.amount);

      const defaultAmcObj = {
        serviceName: amcData.serviceName,
        serviceCompanyName: amcData.serviceCompanyName,
        startDate: amcData.startDate ? new Date(amcData.startDate) : null,
        endDate: amcData.endDate ? new Date(amcData.endDate) : null,
        amount: formatInput(defaultAmount),
      };

      if (!id) {
        const response = await dispatch(addAmc(amcObj));
        if (response) {
          await dispatch(updateTab('Documents'));
        }
      } else {
        const response = await dispatch(updateAmc(Number(id), amcObj));
        if (response) {
          await dispatch(updateTab('Documents'));
        }
      }
      dispatch(updateAmcValues(defaultAmcObj));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: error.message,
            variant: 'error',
          }),
        );
      } else {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}>
      <AuthChecker
        allowedRoles={[
          Roles.HR_ADMIN,
          Roles.SUPER_ADMIN,
          Roles.ADMIN,
          Roles.ACCOUNT_ADMIN,
        ]}>
        {(isAuthorised: boolean) => (
          <div className='grid grid-cols-1 gap-4 '>
            <Card className='grid gap-4 md:col-span-2'>
              <AmcDetailsForm />
              <div className='flex w-full justify-end'>
                <Button
                  className='w-50 '
                  isDisabled={!isAuthorised}
                  type='submit'
                  isLoading={isSubmitting}>
                  {id ? 'Update' : 'Add'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </AuthChecker>
    </FormProvider>
  );
};

export default AmcForm;
