'use client';
import withAllowedRole from '@/hoc/withAllowedRole';
import { API_ENDPOINT, AllRoles, BUTTON_LABELS, Roles } from '@/utils/constant';
import { Employee } from '@/types/employee';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios';
import Loader from '@/components/common/Loader';
import { useRouter } from 'next/navigation';
import { getDepartments } from '@/redux/department/departmentSlice';
import { getEmployeeDesignation } from '@/redux/designation/designationSlice';
import { getAllRoles } from '@/redux/role/roleSlice';
import { getUserInfo } from '@/redux/user-info/userInfoSelector';
import Button from '@/components/common/Button';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import AuthChecker from '@/components/common/AuthChecker';
import { formatDate } from '@/utils/formatTime';
import { toTitleCase } from '@/utils/utils';
import { EyeIcon } from '@heroicons/react/24/outline';
import { usePopupManager } from '@/providers/PopupManager';
import { Avatar } from '@nextui-org/react';
interface EditEmployeeProps {
  params: { employeeId: string };
}

const Profile: React.FC<EditEmployeeProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector(getUserInfo);
  const { showDocumentPreview, hidePopup } = usePopupManager();

  useEffect(() => {
    return () => {
      hidePopup();
    };
  }, []);

  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getDepartments());
    dispatch(getEmployeeDesignation());
  }, [dispatch]);

  const [loading, setLoading] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  const getEmployeeDetails = async () => {
    setLoading(true);
    try {
      const { data }: { data: Employee } = await axiosInstance.get(
        API_ENDPOINT.LOGGEDIN_USER,
      );
      setEmployeeData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getEmployeeDetails();
    }
  }, [user]);

  if (loading) return <Loader />;

  const viewFile = (fileUrl: string) => {
    showDocumentPreview({
      documentUrl: fileUrl,
    });
  };

  return (
    <div className='container mx-auto'>
      <div>
        <div className='flex justify-between pl-4 pr-4'>
          <h2 className='text-2xl font-semibold'>Profile</h2>
          <AuthChecker
            allowedRoles={[Roles.HR_ADMIN, Roles.SUPER_ADMIN, Roles.ADMIN]}>
            {(isAuthorised: boolean) =>
              isAuthorised && (
                <Button
                  color='primary'
                  variant='solid'
                  onClick={() => router.push('/edit-profile')}
                  startContent={<PencilSquareIcon className='h-5 w-5' />}>
                  {BUTTON_LABELS.EDIT}
                </Button>
              )
            }
          </AuthChecker>
        </div>
        <div className='container mx-auto p-4'>
          <div className='overflow-hidden rounded-lg border-1 bg-white'>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>Personal Details</h2>
            </div>
            <div className='flex flex-col p-4 sm:flex-row md:items-center'>
              <div className='mr-4 flex-none sm:flex sm:items-center'>
                <Avatar
                  as='button'
                  className='h-28 w-28 rounded-full border-4 border-gray-200'
                  color='secondary'
                  size='sm'
                  src={`${process.env.NEXT_PUBLIC_CLOUD_FLARE_URL}${employeeData?.profileImageUrl}`}
                  showFallback
                />
              </div>
              <div className='flex-grow'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <p className='text-sm text-gray-600'>Name</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.fullName
                        ? toTitleCase(employeeData?.fullName)
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Email</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.email ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Mobile</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.mobileNumber ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Date of Birth</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.dateOfBirth
                        ? formatDate(employeeData?.dateOfBirth)
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Gender</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.gender
                        ? toTitleCase(employeeData?.gender)
                        : '-'}
                    </p>
                  </div>

                  <div>
                    <p className='text-sm text-gray-600'>Marital Status</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.maritalStatus
                        ? toTitleCase(employeeData?.maritalStatus)
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Location</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.location
                        ? toTitleCase(employeeData?.location)
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Country</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.country
                        ? toTitleCase(employeeData?.country)
                        : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto p-4'>
          <div className='overflow-hidden rounded-lg border-1 bg-white'>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>Employment Details</h2>
            </div>
            <div className='flex flex-col p-4 sm:flex-row'>
              <div className='flex-grow'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
                  <div>
                    <p className='text-sm text-gray-600'>Employee Code</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.employeeCode
                        ?.toUpperCase()
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (match: string) =>
                          match.toUpperCase(),
                        ) ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>UAN Number</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.UANNumber ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Designation</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.Designation?.designationName
                        ?.toLowerCase()
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (match: string) =>
                          match.toUpperCase(),
                        ) ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Role</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.roles[0]
                        ? toTitleCase(
                            employeeData?.roles[0]?.roleName
                              ?.toLowerCase()
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (match: string) =>
                                match.toUpperCase(),
                              ),
                          )
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Department</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.Department?.deptName
                        ? toTitleCase(employeeData?.Department?.deptName)
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Date of Joining</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.joiningDate
                        ? formatDate(employeeData?.joiningDate)
                        : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto p-4'>
          <div className='overflow-hidden rounded-lg border-1 bg-white'>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>Document Details</h2>
            </div>
            <div className='flex flex-col p-4 sm:flex-row'>
              <div className='flex-grow'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                  <div>
                    <p className='text-sm text-gray-600'>Aadhar Number</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.aadharNumber ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Aadhar Card</p>
                    <p
                      className={`text-sm font-semibold text-gray-600 ${employeeData?.aadharCard && 'cursor-pointer'}`}>
                      {employeeData?.aadharCard ? (
                        <EyeIcon
                          onClick={() => {
                            viewFile(
                              employeeData?.aadharCard
                                ? employeeData.aadharCard
                                : '',
                            );
                          }}
                          className='h-5 w-5'
                        />
                      ) : (
                        '-'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Pan Number</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.panNumber ?? '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Pan Card</p>
                    <p
                      className={`text-sm font-semibold text-gray-600 ${employeeData?.panCard && 'cursor-pointer'}`}>
                      {employeeData?.panCard ? (
                        <EyeIcon
                          onClick={() => {
                            viewFile(
                              employeeData?.panCard ? employeeData.panCard : '',
                            );
                          }}
                          className='h-5 w-5'
                        />
                      ) : (
                        '-'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Mediclaim Number</p>
                    <p className='text-sm font-semibold text-gray-600'>
                      {employeeData?.mediclaimNumber
                        ? employeeData.mediclaimNumber
                        : '-'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-600'>Education Documents</p>
                    <p
                      className={`text-sm font-semibold text-gray-600 ${employeeData?.educationDocuments && 'cursor-pointer'}`}>
                      {employeeData?.educationDocuments ? (
                        <EyeIcon
                          onClick={() => {
                            viewFile(
                              employeeData?.educationDocuments
                                ? employeeData.educationDocuments
                                : '',
                            );
                          }}
                          className='h-5 w-5'
                        />
                      ) : (
                        '-'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAllowedRole(Profile, AllRoles);
