import { ValueLabelOption } from '@/types/component/common/select';
import { DesignationData } from './designation';
import { Department } from './department';
import { ZonedDateTime } from '@internationalized/date';

interface Role {
  id: string;
  roleName: string;
}

interface Approver {
  id: string;
  fullName: string;
}

export interface Employee {
  id: string;
  fullName: string;
  role: string;
  dateOfBirth: string;
  aadharNumber: string;
  email: string;
  gender: string;
  joiningDate: string;
  employeeId: string;
  employeeCode: string;
  roles: Role[];
  mobileNumber: string;
  panNumber: string;
  designationId: string;
  Designation?: DesignationData;
  Department?: Department;
  profileImageUrl?: string;
  departmentId: string;
  maritalStatus: string;
  location: string;
  country: string;
  aadharCard?: string | null;
  panCard?: string | null;
  approversList: Approver[];
  mediclaimNumber: string;
  educationDocuments: string;
  UANNumber?: string | null;
}

export interface EmployeeInput {
  employeeCode?: string;
  fullName: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  maritalStatus: string;
  designationId: number | null;
  approvers: number[] | null;
  joiningDate: string;
  employeeId?: string;
  roles: number[] | null;
  mobileNumber: string;
  aadharNumber: string | null;
  panNumber: string | null;
  departmentId: number | null;
  profileImageUrl?: string;
  aadharCard?: string | null;
  mediclaimNumber: string;
  educationDocuments: string | null;
  panCard?: string | null;
  UANNumber?: string | null;
}

export interface EmployeeForm {
  employeeCode?: string;
  mediclaimNumber: string;
  educationDocuments: string | null;
  UANNumber: string | null;
  firstName: string;
  lastName: string;
  gender: ValueLabelOption | null;
  maritalStatus: ValueLabelOption | null;
  designationId: ValueLabelOption | null;
  dateOfBirth: ZonedDateTime | string | null;
  email: string;
  mobileNumber: string;
  dateOfJoining: ZonedDateTime | string | null;
  roles: ValueLabelOption | null;
  departmentId: ValueLabelOption | null;
  aadharNumber: string | null;
  panNumber: string | null;
  profileImageUrl?: string;
  location: string;
  country: string;
  documentType?: ValueLabelOption[] | null;
  approvers?: ValueLabelOption[] | null;
  aadharCard?: string | null;
  panCard?: string | null;
}

export interface FileUpload {
  panCard: string;
  aadharCard: string;
  educationDocuments: string;
}
