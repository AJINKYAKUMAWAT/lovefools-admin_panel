import { EmployeeForm } from '@/types/employee';
import { ValueLabelOption } from '@/types/component/common/select';
import { convertToDateFormat } from '@/utils/formatTime';

export const generateEmployeePayload = (employeeData: EmployeeForm) => {
  const dateOfBirth = employeeData.dateOfBirth
    ? convertToDateFormat(employeeData.dateOfBirth)
    : '';
  const joiningDate = employeeData.dateOfJoining
    ? convertToDateFormat(employeeData.dateOfJoining)
    : '';

  const payload = {
    employeeCode: employeeData.employeeCode,
    fullName: `${employeeData.firstName} ${employeeData.lastName}`,
    email: employeeData.email,
    mobileNumber: employeeData.mobileNumber,
    gender: employeeData!.gender!.value || '',
    roles: employeeData.roles ? [parseInt(employeeData.roles.value)] : null,
    dateOfBirth,
    joiningDate,
    aadharNumber: employeeData.aadharNumber || null,
    panNumber: employeeData.panNumber || null,
    location: employeeData.location,
    country: employeeData.country,
    departmentId: employeeData.departmentId
      ? parseInt(employeeData.departmentId?.value)
      : null,
    profileImageUrl: employeeData.profileImageUrl,
    designationId: employeeData.designationId
      ? parseInt(employeeData.designationId?.value)
      : null,
    approvers: (employeeData.approvers || []).map((item: ValueLabelOption) =>
      parseInt(item.value),
    ),
    maritalStatus: employeeData.maritalStatus?.value || '',
    aadharCard: employeeData.aadharCard ? employeeData.aadharCard : null,
    panCard: employeeData.panCard ? employeeData.panCard : null,
    mediclaimNumber: employeeData.mediclaimNumber,
    educationDocuments: employeeData.educationDocuments
      ? employeeData.educationDocuments
      : null,
    UANNumber: employeeData.UANNumber ? employeeData.UANNumber : null,
  };

  return payload;
};
