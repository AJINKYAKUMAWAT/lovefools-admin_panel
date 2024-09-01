'use client';
import withAllowedRole from '@/hoc/withAllowedRole';
import {
  API_ENDPOINT,
  DocumentTypeOptions,
  EMPLOYEE_MESSAGES,
  ERROR_MESSAGES,
  GenderTypeOptions,
  MaritalStatusOptions,
  Roles,
} from '@/utils/constant';
import { Employee, EmployeeForm } from '@/types/employee';
import { useAppDispatch, useAppSelector } from '@/redux/selector';
import EmployeeFormTitleSection from '@/components/employees/EmployeeFormTitleSection';
import EmployeeFormComponent from '@/components/employees/EmployeeForm';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axios';
import Loader from '@/components/common/Loader';
import { updateEmployee } from '@/redux/employees/employeesSlice';
import { showNotification } from '@/redux/notification/notification-slice';
import { useRouter } from 'next/navigation';
import {
  findSelectedValueLabelOptions,
  findSingleSelectedValueLabelOption,
  generateDocumentTypeOptions,
  generateOptions,
} from '@/utils/utils';

import {
  getDepartments,
  getApprovers,
} from '@/redux/department/departmentSlice';
import { getEmployeeDesignation } from '@/redux/designation/designationSlice';
import { getAllRoles } from '@/redux/role/roleSlice';
import { getRoles } from '@/redux/role/roleSelector';
import { getUserInfo } from '@/redux/user-info/userInfoSelector';
import { generateEmployeePayload } from '@/utils/employee';
import BackButton from '@/components/common/BackButton';
import { CustomError } from '@/types/errorMessage';
import { parseAbsoluteToLocal } from '@internationalized/date';

interface EditEmployeeProps {
  params: { employeeId: string };
}

const Profile: React.FC<EditEmployeeProps> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { roles } = useAppSelector(getRoles);
  const { user } = useAppSelector(getUserInfo);

  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getDepartments());
    dispatch(getEmployeeDesignation());
  }, [dispatch]);

  const [loading, setLoading] = useState<boolean>(false);
  const defaultValues = useRef<EmployeeForm>({
    firstName: '',
    lastName: '',
    gender: null,
    designationId: null,
    approvers: null,
    maritalStatus: null,
    dateOfBirth: null,
    email: '',
    mobileNumber: '',
    dateOfJoining: null,
    roles: null,
    location: '',
    country: '',
    departmentId: null,
    aadharNumber: null,
    panNumber: null,
    profileImageUrl: '',
    employeeCode: '',
    mediclaimNumber: '',
    educationDocuments: '',
    UANNumber: null,
  });

  const onSubmit = async (employeeData: EmployeeForm) => {
    const payloadData = generateEmployeePayload(employeeData);

    try {
      if (user) {
        await dispatch(updateEmployee(user.id, payloadData));
      }

      dispatch(
        showNotification({
          message: EMPLOYEE_MESSAGES.UPDATE_PROFILE_SUCCESS,
          variant: 'success',
        }),
      );
      router.push('/profile/my-profile');
    } catch (error) {
      let errorMessage: CustomError | undefined;
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: error.message,
            variant: 'error',
          }),
        );
      } else {
        errorMessage = error as CustomError; // Type assertion
        dispatch(
          showNotification({
            message: errorMessage
              ? errorMessage.message
              : ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }
  };

  const getEmployeeDetails = async () => {
    setLoading(true);
    try {
      const { data }: { data: Employee } = await axiosInstance.get(
        API_ENDPOINT.LOGGEDIN_USER,
      );
      const [firstName, lastName] = data.fullName.split(' ');

      if (data.departmentId) {
        await dispatch(getApprovers(data.roles[0].id));
      }

      let approversList = [];
      if (data?.departmentId && data.roles?.length > 0) {
        approversList = await dispatch(getApprovers(data.roles[0].id));
      }

      defaultValues.current = {
        firstName,
        lastName,
        gender: findSingleSelectedValueLabelOption(
          GenderTypeOptions,
          data.gender,
        ),
        designationId: data.Designation
          ? {
              value: String(data.Designation?.id),
              label: String(data.Designation?.designationName),
            }
          : null,
        maritalStatus: data.maritalStatus
          ? findSingleSelectedValueLabelOption(
              MaritalStatusOptions,
              data?.maritalStatus,
            )
          : null,
        location: data.location,
        employeeCode: data.employeeCode,
        country: data.country,
        dateOfBirth: parseAbsoluteToLocal(data.dateOfBirth),
        email: data.email,
        mobileNumber: data.mobileNumber,
        dateOfJoining: parseAbsoluteToLocal(data.joiningDate),
        roles: data.roles
          ? findSingleSelectedValueLabelOption(
              generateOptions(roles, 'id', 'roleName'),
              data.roles[0]?.id,
            )
          : null,
        departmentId: data.Department
          ? {
              value: String(data.Department?.id),
              label: String(data.Department?.deptName),
            }
          : null,
        aadharNumber: data.aadharNumber,
        panNumber: data.panNumber,
        profileImageUrl: data.profileImageUrl ? data.profileImageUrl : '',
        documentType: findSelectedValueLabelOptions(
          DocumentTypeOptions, // Use type assertion
          generateDocumentTypeOptions(data.panNumber, data.aadharNumber).map(
            (option) => option.value,
          ),
        ),
        approvers:
          data.approversList?.length > 0
            ? findSelectedValueLabelOptions(
                generateOptions(approversList, 'id', 'name'),
                data.approversList.map((approver) => approver.id),
              )
            : null,
        aadharCard: data.aadharCard,
        mediclaimNumber: data.mediclaimNumber,
        educationDocuments: data.educationDocuments,
        UANNumber: data.UANNumber ? data.UANNumber : null,
      };
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
  const goBack = () => {
    router.back();
  };
  return (
    <div className='container mx-auto'>
      <div>
        <BackButton onClick={goBack} />
        {user && user?.roles[0]?.roleName !== Roles.EMPLOYEE && (
          <EmployeeFormTitleSection
            title='Update Profile details'
            subtitle='Update the details below to modify information.'
          />
        )}
        <EmployeeFormComponent
          defaultValues={defaultValues.current}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default withAllowedRole(Profile, [
  Roles.SUPER_ADMIN,
  Roles.HR_ADMIN,
  Roles.ADMIN,
]);
