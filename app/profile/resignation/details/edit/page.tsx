'use client';
import {
  API_ENDPOINT,
  AllRoles,
  ERROR_MESSAGES,
  RESIGNATION_MESSAGE,
} from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/redux/selector';
import { showNotification } from '@/redux/notification/notification-slice';
import { ResignationData } from '@/types/resignation';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import ResignationForm from '@/components/resignation/ResignationForm';
import BackButton from '@/components/common/BackButton';
import { datepickerFormatDate, formatDate } from '@/utils/formatTime';
import Loader from '@/components/common/Loader';

const UpdateResignation = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const defaultValues = useRef<ResignationData>({
    id: null,
    reason: '',
    dateApplied: null,
    lastWorkingDay: null,
    noticePeriod: 'Three Months',
  });

  const getResignationsDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(API_ENDPOINT.GET_RESIGNATION_ME);

      if (data) {
        defaultValues.current = {
          reason: data.reason,
          dateApplied: new Date(datepickerFormatDate(data.dateApplied)),
          lastWorkingDay: new Date(datepickerFormatDate(data.lastWorkingDay)),
          noticePeriod: 'Three Months',
        };
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResignationsDetails();
  }, []);

  const onSubmit = async (resignationData: ResignationData) => {
    const resignationObj = {
      reason: resignationData.reason,
      lastWorkingDay: resignationData.lastWorkingDay
        ? formatDate(resignationData.lastWorkingDay)
        : null,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.patch(
        API_ENDPOINT.GET_RESIGNATION_ME,
        resignationObj,
      );
      if (response) {
        setLoading(false);
        dispatch(
          showNotification({
            message: RESIGNATION_MESSAGE.RESIGNATION_UPDATE,
            variant: 'success',
          }),
        );
        router.back();
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

  const goBack = () => {
    router.back();
  };
  return (
    <div className='container mx-auto'>
      <div className='mb-4 flex items-center'>
        <BackButton onClick={goBack} />
        <h2 className='ml-2 mt-[-6px] text-2xl font-semibold'>
          Update Resignation
        </h2>
      </div>
      <div>
        {!loading && (
          <ResignationForm
            defaultValues={defaultValues.current}
            handleResignationSubmit={onSubmit}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default withAllowedRole(UpdateResignation, AllRoles);
