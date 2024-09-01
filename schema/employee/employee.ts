import { ValueLabelOption } from '@/types/component/common/select';
import { DOCUMENT_TYPES } from '@/utils/constant';
import * as Yup from 'yup';

export const employeeSchema = Yup.object().shape({
  employeeCode: Yup.string()
    .max(10, 'Employee Code is max 10 characters allowed')
    .required('Employee Code is required'),
  firstName: Yup.string()
    .max(30, 'First name is max 30 characters allowed')
    .required('First name is required'),
  mediclaimNumber: Yup.string()
    .max(30, 'Mediclaim Number is max 30 characters allowed')
    .required('Mediclaim Number is required'),
  lastName: Yup.string()
    .max(30, 'Last name is max 30 characters allowed')
    .required('Last name is required'),
  gender: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Gender is required'),
  UANNumber: Yup.string(),
  maritalStatus: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Marital status is required'),
  dateOfBirth: Yup.string().nullable().required('Date of birth is required'),
  educationDocuments: Yup.string().nullable(),
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must be a valid email address',
    ),
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Please enter valid mobile number')
    .required('Mobile number is required'),
  location: Yup.string()
    .max(30, 'Location is max 30 characters allowed')
    .required('Location is required'),
  country: Yup.string()
    .max(30, 'country is max 30 characters allowed')
    .required('Country is required'),
  dateOfJoining: Yup.string()
    .nullable()
    .required('Date of joining is required'),
  designationId: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Designation is required'),
  roles: Yup.object({
    label: Yup.string(),
    value: Yup.string(),
  }).required('Role is required'),
  approvers: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .nullable()
    .test(
      'conditionalRequired',
      'Please select approver',
      function (value, { parent }) {
        if (parent?.roles?.value === '1' || (value && value.length !== 0)) {
          return true;
        }
        return false;
      },
    ),
  departmentId: Yup.object({
    value: Yup.string(),
    label: Yup.string(),
  }).required('Department is required'),
  documentType: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1, 'Please select at least one document type')
    .required('Please select a document type'),
  aadharNumber: Yup.string()
    .test(
      'conditionalRequired',
      'Aadhar Number is required',
      function (value, { parent }) {
        if (
          parent?.documentType?.some(
            (doc: ValueLabelOption) => doc.value === DOCUMENT_TYPES.AADHAR_CARD,
          )
        ) {
          return !!value;
        }
        return true;
      },
    )
    .nullable()
    .matches(/^\d{12}$/, 'Aadhar Number must be 12 digits'),
  panNumber: Yup.string()
    .test(
      'conditionalRequired',
      'PAN Number is required',
      function (value, { parent }) {
        if (
          parent?.documentType?.some(
            (doc: ValueLabelOption) => doc.value === DOCUMENT_TYPES.PAN_CARD,
          )
        ) {
          return !!value;
        }
        return true;
      },
    )
    .nullable()
    .matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/, 'Invalid PAN Number'),
  aadharCard: Yup.string().nullable(),
  panCard: Yup.string().nullable(),
  profileImageUrl: Yup.string(),
});
