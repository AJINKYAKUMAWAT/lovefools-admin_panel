'use client';
import {
  API_ENDPOINT,
  BUTTON_LABELS,
  NoticePeriodStatus,
  Roles,
} from '@/utils/constant';
import withAllowedRole from '@/hoc/withAllowedRole';
import { ResignationListData } from '@/types/resignation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios';
import { formatDate } from '@/utils/formatTime';
import Button from '@/components/common/Button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { toTitleCase } from '@/utils/utils';
import Loader from '@/components/common/Loader';

const AddResignationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resignationData, setResignationData] =
    useState<ResignationListData | null>(null);

  const router = useRouter();

  const getResignationsDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_ENDPOINT.GET_RESIGNATION_ME);
      setResignationData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResignationsDetails();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between pl-4 pr-4'>
        <div className='flex items-center'>
          <h2 className='ml-4 mt-[-10px] text-2xl font-semibold'>
            Resignation Details
          </h2>
        </div>
        {(resignationData?.status === NoticePeriodStatus.PENDING ||
          resignationData?.status === NoticePeriodStatus.ON_HOLD) && (
          <Button
            color='primary'
            variant='solid'
            onClick={() => router.push(`/resignation/details/edit`)}
            startContent={<PencilSquareIcon className='h-5 w-5' />}>
            {BUTTON_LABELS.EDIT}
          </Button>
        )}
      </div>
      <div className='container mx-auto p-4'>
        <div className='overflow-hidden rounded-lg border-1 bg-white'>
          <div className='flex flex-col p-4 sm:flex-row md:items-center'>
            <div className='flex-grow'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <div>
                  <p className='text-sm text-gray-600'>Name</p>
                  <p className='text-sm font-semibold text-gray-600'>
                    {resignationData?.resignedBy?.fullName
                      ? toTitleCase(resignationData?.resignedBy?.fullName)
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Applied Date</p>
                  <p className='text-sm font-semibold text-gray-600'>
                    {resignationData?.dateApplied
                      ? formatDate(resignationData?.dateApplied)
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Last Working Day</p>
                  <p className='text-sm font-semibold text-gray-600'>
                    {resignationData?.lastWorkingDay
                      ? formatDate(resignationData?.lastWorkingDay)
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Notice Period</p>
                  <p className='text-sm font-semibold text-gray-600'>
                    {resignationData?.noticePeriod
                      ?.toLowerCase()
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, (match: string) =>
                        match.toUpperCase(),
                      ) ?? '-'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Status</p>
                  <p className='text-sm font-semibold text-gray-600'>
                    {resignationData?.status === NoticePeriodStatus.PENDING && (
                      <span className='text-orange-500'>
                        {toTitleCase(resignationData?.status)}
                      </span>
                    )}
                    {resignationData?.status === NoticePeriodStatus.ON_HOLD && (
                      <span className='text-yellow-400'>
                        {resignationData?.status === NoticePeriodStatus.ON_HOLD
                          ? 'On Hold'
                          : '-'}
                      </span>
                    )}
                    {resignationData?.status ===
                      NoticePeriodStatus.APPROVED && (
                      <span className='text-green-500'>
                        {toTitleCase(resignationData?.status)}
                      </span>
                    )}
                    {resignationData?.status ===
                      NoticePeriodStatus.REJECTED && (
                      <span className='text-red-500'>
                        {toTitleCase(resignationData?.status)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAllowedRole(AddResignationForm, [
  Roles.SUPER_ADMIN,
  Roles.HR_ADMIN,
  Roles.EMPLOYEE,
  Roles.ACCOUNT_ADMIN,
  Roles.TEAM_LEAD,
  Roles.ADMIN,
  Roles.BUSINESS_DEVELOPER,
  Roles.IT_ADMIN,
]);
