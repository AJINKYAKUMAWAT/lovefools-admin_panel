'use client';
import {
  API_ENDPOINT,
  AllRoles,
  ERROR_MESSAGES,
  RESIGNATION_MESSAGE,
} from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import ResignationForm from '@/components/resignation/ResignationForm';
import { ResignationData } from '@/types/resignation';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';
import axiosInstance from '@/utils/axios';
import { formatDate } from '@/utils/formatTime';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader';

const AddResignationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const defaultValues: ResignationData = {
    id: null,
    reason: '',
    dateApplied: null,
    lastWorkingDay: null,
    noticePeriod: 'Three Months',
  };

  const router = useRouter();

  const onSubmit = async (resignationData: ResignationData) => {
    const resignationObj = {
      reason: resignationData.reason,
      dateApplied: resignationData.dateApplied
        ? formatDate(resignationData.dateApplied)
        : null,
      lastWorkingDay: resignationData.lastWorkingDay
        ? formatDate(resignationData.lastWorkingDay)
        : null,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        API_ENDPOINT.RESIGNATION,
        resignationObj,
      );
      if (response) {
        setLoading(false);
        dispatch(
          showNotification({
            message: RESIGNATION_MESSAGE.RESIGNATION_SUCCESS,
            variant: 'success',
          }),
        );
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
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
  if (loading) return <Loader />;

  return (
    <div className='container mx-auto'>
      <div>
        <div className='mb-4 flex flex-col justify-between'>
          <h2 className='text-2xl font-semibold'>Resignation Form</h2>
        </div>
        <div>
          <ResignationForm
            defaultValues={defaultValues}
            handleResignationSubmit={onSubmit}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default withAllowedRole(AddResignationForm, AllRoles);
