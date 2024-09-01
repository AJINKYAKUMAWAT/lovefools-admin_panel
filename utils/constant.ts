import { TabData } from '@/types/component/common/tabTitles';

export const API_ENDPOINT = {
  LOGIN: 'user/login',
  REFRESH_TOKEN: 'auth/refreshAuthToken',
  LOGGEDIN_USER: 'employee/me',
  EMPLOYEE: 'employee',
  getEmployeeById: (id: string) => `employee/${id}`,
  CREATE_EMPLOYEE: 'employee',
  IMAGE_UPLOAD: 'files/uploadFiles',
  DEPARTMENT: '/feature-config/departments',
  getLeaveApprovers: (id: string) => `leaveApplication/approver/${id}`,
  DESIGNATION: '/feature-config/designations',
  ROLES: '/feature-config/roles',
  LEAVE: 'leaves',
  All_Leave: 'leaveApplication',
  MY_LEAVES: `leaveApplication/user/me`,
  APPLY_LEAVE: 'leaveApplication',
  UPDATE_LEAVE_STATUS: (id: number | string, status: string) =>
    `leaveApplication/updateLeaveStatus/${id}/${status}`,
  UPDATE_LEAVE: (id: number | string) => `leaveApplication/updateLeave/${id}`,
  deleteLeave: (id: number | string) => `leaveApplication/${id}`,
  CREATE_ASSETS: 'inventory/officeItems',
  updateProduct: (productId: number) => `inventory/updateProduct/${productId}`,
  ASSETS_LIST: 'inventory/officeItems',
  ALLOCATE: 'inventory/allocation',
  GET_ALL_CLIENTS: 'client',
  CREATE_CLIENT: 'client',
  updateCLient: (id: number | string) => `client/${id}`,
  deleteCLient: (id: number | string) => `client/${id}`,
  GET_PETTYCASH: 'pettyCash',
  updatePettycash: (id: number | string) => `pettyCash/${id}`,
  PENTACLE_GLOBAL: 'client/getPentacleDetails',
  CREATE_TRANSACTIONS: 'transactions',
  ALL_TRANSACTIONS: 'transactions',
  GET_TRANSACTION: (id: number | string) => `transactions/${id}`,
  SUNDRY: 'sundry',
  SUNDRY_UPDATE: (id: number | string) => `sundry/${id}`,
  GET_ALL_REIMBURSEMENT: `reimbursement`,
  CREATE_REIMBURSEMENT: `reimbursement`,
  updateReimbursement: (id: number | string) => `reimbursement/${id}`,
  GET_USER_REIMBURSEMENT: `reimbursement/me`,
  deleteReimbursement: (id: number | string) => `reimbursement/${id}`,
  UPDATE_REIMBURSEMENT_STATUS: (id: number | string) =>
    `reimbursement/updateStatus/${id}`,
  GET_ALL_SALARYSLIP: `salarySlip`,
  UPLOAD_SALARY_SLIP: `salarySlip`,
  GET_USER_SALARIES: 'salarySlip/user/me',
  UPLOAD_FILE: 'files/uploadFiles',
  OFFICIAL_DOCUMENTS: 'officialDocument',
  CAR_DOCUMENTS: 'vehicleDocument',
  FILE_EXPLORER: (docId: number, parentId: number) =>
    `fileExplorer/${docId}/${parentId}`,
  ADD_FILE_EXPLORER: 'fileExplorer',
  GET_CAR_DETAILS: (id: number) => `vehicleDocument/${id}`,
  GET_PRESIGNED_URL: `files/signedUrl`,
  DELETE_FILE_EXPLORER: (docId: number) => `fileExplorer/${docId}`,

  EDIT_AND_DELETE_PROPERTY_DOCUMENTS: (id: number) => `propertyDocument/${id}`,
  DELETE_AND_EDIT_FILE_EXPLORER: (docId: number) => `fileExplorer/${docId}`,
  PROPERTY_DOCUMENTS: 'propertyDocument',
  GET_ALL_AREA_OF_INTERESTS: 'areaofInterest',
  CREATE_AREA_OF_INTEREST: 'areaofInterest',
  updateOrDeletAreaOfInterest: (id: number | string) => `areaofInterest/${id}`,
  GET_ALL_PROJECT_TYPES: 'projectType',
  CREATE_PROJECT_TYPE: 'projectType',
  updateOrdeleteProjectType: (id: number | string) => `projectType/${id}`,
  BANK_GUARANTEE: 'bankGuarantee',
  DELETE_AND_EDIT_BANK_GUARANTEE: (id: number) => `bankGuarantee/${id}`,
  UPDATE_OFFICIAL_DOCUMENTS: (id: number) => `officialDocument/${id}`,
  COMPANY_DIRECTORS: 'companyDirector',
  UPDATE_COMPANY_DIRECTOR: (id: number) => `companyDirector/${id}`,
  ASSOCIATION_WITH_JOINT_VENTURES: 'associationWithJointVentures',
  updateOrDeletAssociationWithJointVenture: (id: number | string) =>
    `associationWithJointVentures/${id}`,
  GET_AssociationWithJointVenture: (id: number | string) =>
    `associationWithJointVentures/${id}`,
  ASSOCIATES_WITH_CLIENT: 'associatesWithClient',
  DELETE_AND_EDIT_ASSOCIATES_WITH_CLIENT: (id: number) =>
    `associatesWithClient/${id}`,
  ASSOCIATION_WITH_CLIENTS: 'associationClients',
  DELETE_AND_EDIT_ASSOCIATION_WITH_CLIENTS: (id: number) =>
    `associationClients/${id}`,
  SUB_CONSULTANT: 'subConsultants',
  COMPETITORS: 'competitors',
  updateOrDeletCompetitors: (id: number | string) => `competitors/${id}`,
  GET_COMPETITORS: (id: number | string) => `competitors/${id}`,

  COMPLETED_PROJECT: 'completedProject',
  updateOrDeleteCompletedProject: (id: number) => `completedProject/${id}`,
  GET_SINGLE_PROJECT: (id: number) => `completedProject/${id}`,
  DELETE_AND_EDIT_SUB_CONSULTANT: (id: number) => `subConsultants/${id}`,
  ASSOCIATION_WITH_SUB_CONSULTANT: 'associationWithSubConsultants',
  DELETE_AND_EDIT_ASSOCIATION_WITH_SUB_CONSULTANT: (id: number) =>
    `associationWithSubConsultants/${id}`,
  GET_ASSOCIATION_WITH_SUB_CONSULTANT: (id: number) =>
    `associationWithSubConsultants/${id}/projects`,
  GET_ASSOCIATES_WITH_CLIENT: (id: number) =>
    `associatesWithClient/${id}/projects`,
  BUSINESS_DEVELOPMENT: 'businessDevelopment',
  updateOrDeleteBusinessDevelopment: (id: number | string) =>
    `businessDevelopment/${id}`,
  GET_BUSINESS_DEVELOPMENT: (id: number | string) =>
    `businessDevelopment/${id}`,
  CHECK_IN: `attendance/checkIn`,
  CHECK_OUT: `attendance/checkOut`,
  MY_CHECKOUT: (status: string) => `attendance/myCheckouts?status=${status}`,
  GET_LOCATION: (latitude: number, longitude: number) =>
    `https://api.opencagedata.com/geocode/v1/json?key=7c4512d538d04c8ba687e18c825148b7&q=${latitude}%2C${longitude}&pretty=1&no_annotations=1`,
  GET_ONGOING_PROJECTS: 'ongoingProjects',
  DELETE_AND_EDIT_ONGOING_PROJECTS: (id: number) => `ongoingProjects/${id}`,
  GET_PROJECT_TRACK_TASK: (id: number) => `projectTrack/task/${id}`,
  ADD_PROJECT_TRACK_TASK: 'projectTrack/task',
  UPDATE_PROJECT_TRACK_STATUS: (id: number) =>
    `projectTrack/updateStatus/task/${id}`,
  ADD_PROJECT_TRACK_SUB_TASK: 'projectTrack/subtask',
  UPDATE_PROJECT_TRACK_SUB_TASK_STATUS: (id: number) =>
    `projectTrack/updateStatus/subTask/${id}`,
  UPDATE_SUB_TASK: (id: number) => `projectTrack/subtask/${id}`,
  UPDATE_SUB_TASK_STATUS: (id: number) =>
    `projectTrack/updateStatus/subTask/${id}`,
  UPDATE_TASK: (id: number) => `projectTrack/task/${id}`,
  ONGOING_PROJECT_UPDATE_STATUS: (id: number) =>
    `/ongoingProjects/updateStatus/${id}`,
  GET_REQUEST: 'requests',
  GET_MY_REQUEST: 'requests/me',
  MY_REQUEST: (id: number) => `requests/me/${id}`,
  MESSAGE_REPLY: (id: number) => `requests/reply/${id}`,
  UPDATE_MESSAGE_STATUS: (id: number) => `requests/updateStatus/${id}`,
  REQUEST: (id: number) => `requests/${id}`,
  GET_ALL_CHECKOUTS: '/attendance',
  GET_ALL_MY_ATTENDANCE: 'attendance/myCheckouts',
  EXPORT_ATTENDENCE: `/attendance/export`,
  UPDATE_PENDING_CHECKOUT_ATTENDENCE: (id: number) =>
    `attendance/updatePendingCheckout/${id}`,
  RequestMissedCheckout: `attendance/requestMissedCheckout`,
  RequestMissedCheckoutUpdate: (id: number) =>
    `attendance/requestMissedCheckout/${id}`,
  GET_ALL_PENDING_CHECKOUTS: '/attendance/pendingCheckouts',
  PASSWORD_CHANGE_REQUEST: 'employee/changePasswordRequest',
  PASSWORD_CHANGE_LIST: 'employee/passwordRequests',
  UPDATE_PASSWORD_CHANGE_REQUEST: (id: number) =>
    `employee/updatePasswordRequest/${id}`,
  UPDATE_PASSWORD_CHANGE: 'employee/changePassword',
  REQUEST_ASSIGNEE: '/requests/getAssignee',
  GET_DESIGNATIONS: 'designations',
  GET_DEPARTMENT: 'departments',
  RESIGNATION: 'resignation',
  GET_RESIGNATIONS: 'resignation',
  GET_RESIGNATION_BY_ID: (id: number) => `resignation/${id}`,
  GET_RESIGNATION_ME: 'resignation/me',
  GET_DEPARTMENT_BY_ID: (id: number) => `departments/${id}`,
  GET_DESIGNATION_BY_ID: (id: number) => `designations/${id}`,
  PETTYCASH_EXPORT: 'pettyCash/export',
  SUNDRY_EXPORT: 'sundry/export',
  TRANSACTION_EXPORT: 'transactions/export',
  GET_NOTIFICATIONS: 'notifications',
  GET_NOTIFICATIONS_ALL_READ: 'notifications/markAllAsRead',
  GET_NOTIFICATIONS_CLEAR_ALL: 'notifications/clearAll',
  NOTIFICATION_READ_BY_ID: (id: number) => `notifications/${id}`,
  ADMIN_DASHBOARD: 'dashboard/admin',
  HR_ADMIN_DASHBOARD: 'dashboard/hrAdmin',
  SUPER_ADMIN_DASHBOARD: 'dashboard/superAdmin',
  EMPLOYEE_DASHBOARD: 'dashboard/employee',
  IT_ADMIN_DASHBOARD: 'dashboard/itAdmin',
  ACCOUNT_ADMIN_DASHBOARD: 'dashboard/accountAdmin',
  BANKS: 'banks',
  updateOrDeletBanks: (id: number | string) => `banks/${id}`,
  BOOKING: 'booking',
  BOOKING_UPDATE: (id: number | string) => `booking/${id}`,
  AMC: 'amc',
  AMC_UPDATE: (id: number | string) => `amc/${id}`,
  CHECK_SERIAL_NUMBER: (serialNumber: string) =>
    `inventory/checkItemSerialNumber/${serialNumber}`,
  UPDATE_CHECK_SERIAL_NUMBER: (serialNumber: string, id: string | number) =>
    `inventory/checkItemSerialNumber/${serialNumber}/${id}`,
  EMPLOYEE_EXPORT: 'employee/export',
  ADD_OFFICE_VISIT: (id: string | number) => `attendance/addOfficeVisit/${id}`,
  TEAM_LEAD_DASHBOARD: 'dashboard/teamLead',
};

export const MAX_RETRIES = 3;

export enum Roles {
  EMPLOYEE = 'EMPLOYEE',
  HR_ADMIN = 'HR_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  ACCOUNT_ADMIN = 'ACCOUNT_ADMIN',
  TEAM_LEAD = 'TEAM_LEAD',
  ADMIN = 'ADMIN',
  IT_ADMIN = 'IT_ADMIN',
  BUSINESS_DEVELOPER = 'BUSINESS_DEVELOPER',
  ACCOUNTANT = 'ACCOUNTANT',
  OFFICE_ASSISTANT = 'OFFICE_ASSISTANT',
}

export const AllRoles = [
  Roles.SUPER_ADMIN,
  Roles.HR_ADMIN,
  Roles.EMPLOYEE,
  Roles.ACCOUNT_ADMIN,
  Roles.TEAM_LEAD,
  Roles.ADMIN,
  Roles.BUSINESS_DEVELOPER,
  Roles.IT_ADMIN,
  Roles.ACCOUNTANT,
  Roles.OFFICE_ASSISTANT,
];

export enum PettyType {
  BANK = 'BANK',
  CASH = 'CASH',
  THROUGH_PENTACLE = 'THROUGH_PENTACLE',
}

export enum NotificationType {
  MY_ATTENDANCE = '/profile/my-attendance',
  ATTENDANCE = '/attendance/all-attendance',
  MY_LEAVE = '/profile/my-leaves',
  LEAVES = '/leaves',
  MY_SALARY = '/profile/my-salaries',
  SALARY = '/salary',
  MY_REQUEST = '/my-requests',
  REQUEST = '/requests',
  MY_REIMBURSEMENT = '/profile/my-reimbursements',
  REIMBURSEMENT = '/reimbursements',
  MY_RESIGNATION = '/profile/resignation',
  RESIGNATION = '/resignations',
  MY_PASSWORD_CHANGE = '/profile/change-password',
  PASSWORD_CHANGE = '/password-change',
  SUNDRY_DEBTORS = '/sundry/debtors',
}

export enum Priority {
  URGENT = 'URGENT',
  High = 'HIGH',
  Normal = 'NORMAL',
  Low = 'LOW',
}

export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum NoticePeriodStatus {
  PENDING = 'PENDING',
  ON_HOLD = 'ON_HOLD',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const StatusType = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
];

export const RequestStatusType = [
  { label: 'Opened', value: 'OPENED' },
  { label: 'Answered', value: 'ANSWERED' },
  { label: 'Resolved', value: 'RESOLVED' },
  { label: 'Closed', value: 'CLOSED' },
];

export const LeaveTypeOptions = [
  { label: 'Paid', value: 'PAID' },
  { label: 'Unpaid', value: 'UNPAID' },
];

export const DayTypeOptions = [
  { label: 'Full day', value: 'FULL_DAY' },
  { label: 'Half day', value: 'HALF_DAY' },
];

export const DOCUMENT_TYPES = {
  AADHAR_CARD: 'AADHAR_CARD',
  PAN_CARD: 'PAN_CARD',
};

export const DocumentTypeOptions = [
  { label: 'Aadhar Card', value: 'AADHAR_CARD' },
  { label: 'Pan Card', value: 'PAN_CARD' },
];

export const GenderTypeOptions = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Others', value: 'OTHERS' },
];

export const BusinessDevelopmentStatusOptions = [
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Tender Opening', value: 'TENDER_OPENING' },
  { label: 'Technical Evaluation', value: 'TECHNICAL_EVALUATION' },
  { label: 'Financial Bid Opening', value: 'FINANCIAL_BID_OPENING' },
  { label: 'Finacial Evaluation', value: 'FINANCIAL_EVALUATION' },
  { label: 'Award Of Contract', value: 'AWARD_OF_CONTRACT' },
];

export enum DepartmentType {
  IT = 'IT',
  FINANCE = 'FINANCE',
  BUSINESS_DEVELOPMENT = 'BUSINESS_DEVELOPMENT',
  HR = 'HR',
  CIVIL = 'CIVIL',
}

export enum RoleType {
  EMPLOYEE = 'EMPLOYEE',
  HR_ADMIN = 'HR_ADMIN',
}

export const MaritalStatusOptions = [
  { label: 'Married', value: 'MARRIED' },
  { label: 'Unmarried', value: 'UNMARRIED' },
];

export enum Designation {
  Developer = 'Developer',
  Hr = 'Hr',
  Accountant = 'Accountant',
}

export enum LeaveApproval {
  Hr = 'Hr',
  Admin = 'Admin',
}

export enum ImageUpload {
  PROFILE_PICTURE = 'PROFILE_PICTURE',
  SALARY_SLIP = 'SALARY_SLIP',
  BILL = 'BILL',
  DOCUMENTS = 'DOCUMENTS',
}

export const DESIGNATIONS_MESSAGES = {
  DESIGNATIONS_SUCCESS: 'Designation added successfully',
  DESIGNATIONS_UPDATE: 'Designation updated successfully',
  DESIGNATIONS_DELETE: 'Designation deleted successfully',
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid Credentials',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  SUNDRY_CREDITORS_UPDATE: 'Sundry creditors updated successfully',
  SUNDRY_DEBTORS_UPDATE: 'Sundry debtors updated successfully',
  SUNDRY_DEBTORS_ADD: 'Sundry debtors added successfully',
  SUNDRY_CREDITORS_ADD: 'Sundry creditor added successfully',
  SUNDRY_CREDITORS_DELETE: 'Sundry creditors deleted successfully',
  SUNDRY_DEBTORS_DELETE: 'Sundry debtors deleted successfully',

  PETTY_CASH_BANK_DELETE: 'Petty cash bank deleted successfully',
  PETTY_CASH_DELETE: 'Petty cash deleted successfully',
  PETTY_CASH_THROUGH_PENTACLE_DELETE:
    'Petty cash through pentacle deleted successfully',

  PETTY_CASH_BANK_UPDATE: 'Petty cash bank updated successfully',
  PETTY_CASH_UPDATE: 'Petty cash updated successfully',
  PETTY_CASH_THROUGH_PENTACLE_UPDATE:
    'Petty cash through pentacle updated successfully',
  PETTY_CASH_BANK_ADD: 'Petty cash bank added successfully',
  PETTY_CASH_ADD: 'Petty cash added successfully',
  PETTY_CASH_THROUGH_PENTACLE_ADD:
    'Petty cash through pentacle added successfully',

  INVALID_FILETYPE:
    'Invalid file type. Please select a JPEG, JPG, PNG image, or PDF.',
  MAX_UPLOAD_SIZE: 'File size exceeds the maximum limit',
  ALLOW_LOCATION:
    'Please enable location access in your device settings to continue.',
  UNSUPPORTED_GEOLOCATION: 'Geolocation is not supported by this browser.',
};

export const EMPLOYEE_MESSAGES = {
  CREATE_EMPLOYEE_SUCCESS: 'Employee added successfully',
  UPDATE_EMPLOYEE_SUCCESS: 'Employee details updated successfully',
  UPDATE_PROFILE_SUCCESS: 'Profile details updated successfully',
  LEAVE_APPROVED_SUCCESS: 'Leave approved successfully',
  LEAVE_REJECTED_SUCCESS: 'Leave rejected successfully',
  DELETE_EMPLOYEE_SUCCESS: 'Employee deleted successfully',
};

export const LEAVE_MESSAGES = {
  APPLY_LEAVE_SUCCESS: 'Apply leave successfully',
  UPDATE_LEAVE_SUCCESS: 'Update leave successfully',
  LEAVE_APPROVED_SUCCESS: 'Leave Approved successfully',
  LEAVE_REJECTED_SUCCESS: 'Leave Rejected successfully',
};

export const PASSWORD_CHANGE_MESSAGES = {
  APPLY_PASSWORD_CHANGE_SUCCESS: 'Password changed request successfully',
  PASSWORD_CHANGE_APPROVED_SUCCESS: 'Password Changed approved successfully',
  PASSWORD_CHANGE_REJECTED_SUCCESS: 'Password Changed rejected successfully',
  PASSWORD_CHANGE_UPDATE_SUCCESS: 'Password Changed updated successfully',
};

export const CLIENT_MESSAGES = {
  CLIENT_CREATE_SUCCESS: 'Client added successfully',
  CLIENT_UPDATE_SUCCESS: 'Client updated successfully',
};

export const REQUEST_MESSAGES = {
  MARK_AS_RESOLVED: 'Mark as resolved successfully',
  CLOSED: 'Request closed successfully',
};

export const REIMBURSEMENT_MESSAGES = {
  REIMBURSEMENT_CREATE_SUCCESS: 'Reimbursement added successfully',
  REIMBURSEMENT_UPDATE_SUCCESS: 'Reimbursement updated successfully',
  REIMBURSEMENT_DELETE_SUCCESS: 'Reimbursement deleted successfully',
  REIMBURSEMENT_APPROVED_SUCCESS: 'Reimbursement approved successfully',
  REIMBURSEMENT_REJECTED_SUCCESS: 'Reimbursement rejected successfully',
};

export const TRANSACTION_MESSAGES = {
  TRANSACTION_CREATE_SUCCESS: 'Transaction added successfully',
  TRANSACTION_UPDATE_SUCCESS: 'Transaction updated successfully',
  TRANSACTION_DELETE_SUCCESS: 'Transaction deleted successfully',
};

export const ASSET_MESSAGES = {
  PRODUCT_ALLOCATED_SUCCESS: 'Product allocated successfully',
  PRODUCT_UNALLOCATED_SUCCESS: 'Product unallocated successfully',
  ASSETS_CREATED_SUCCESS: 'Assets added successfully',
  ASSETS_UPDATE_SUCCESS: 'Assets updated successfully',
  TRANSACTION_DELETE_SUCCESS: 'Transaction deleted successfully',
};

export const CONFIRMATION_MESSAGES = {
  CLIENT_DELETE: 'Are you sure want to delete client ?',
  EMPLOYEE_DELETE: 'Are you sure want to delete employee ?',
  LEAVE_APPROVE: 'Are you sure want to approve leave ?',
  LEAVE_REJECT: 'Are you sure want to reject leave ?',
  LEAVE_DELETE: 'Are you sure want to delete leave ?',
  REIMBURSEMENT_APPROVE: 'Are you sure want to approve reimbursement ?',
  REIMBURSEMENT_REJECT: 'Are you sure want to reject reimbursement ?',
  CLEAR_ALL_READ: 'Are you sure want to clear all read messages ?',
  REIMBURSEMENT_DELETE: 'Are you sure want to delete reimbursement ?',
  TRANSACTION_DELETE: 'Are you sure want to delete transaction ?',
  SUNDRY_DELETE: 'Are you sure want to delete sundry ?',
  SUNDRY_CREDITORS_DELETE: 'Are you sure want to delete sundry creditors ?',
  SUNDRY_DEBTORS_DELETE: 'Are you sure want to delete sundry debtors ?',

  UNALLOCATE_PRODUCT: 'Are you sure you want to unallocate this product?',
  PETTY_CASH_BANK_DELETE: 'Are you sure want to delete Petty Cash Bank?',

  PETTY_CASH_DELETE: 'Are you sure want to delete Petty Cash?',
  PETTY_CASH_THROUGH_PENTACLE_DELETE:
    'Are you sure want to delete Petty Cash Through Pentacle?',
  FILE_DELETE: 'Are you sure want to delete',
  CAR_DOCUMENT_DELETE: 'Are you sure want to delete Vehicle?',
  PROPERTY_DOCUMENT_DELETE: 'Are you sure want to delete Property document?',
  AREA_OF_INTEREST_DELETE: 'Are you sure want to delete Area of interest ?',
  BANK_DELETE: 'Are you sure want to delete Bank ?',

  PROJECT_TYPE_DELETE: 'Are you sure want to delete Project Type?',
  BANK_GUARANTEE_DELETE: 'Are you sure want to delete Bank Guarantee?',
  DIRECTOR_DELETE: 'Are you sure want to delete Director?',
  BUSINESS_DEVELOPMENT_DELETE:
    'Are you sure want to delete this business developement details?',
  DEPARTMENT_DELETE: 'Are you sure want to delete this department?',
  DESIGNATION_DELETE: 'Are you sure want to delete this designation?',

  ASSOCIATION_WITH_JOINT_VENTURES_DELETE:
    'Are you sure want to this association With Joint Venture?',
  SUB_CONSULTANT_DELETE: 'Are you sure want to delete Sub Consultant?',
  ASSOCIATION_WITH_CLIENT_DELETE:
    'Are you sure want to delete Association with Client?',
  ASSOCIATES_WITH_CLIENT_DELETE:
    'Are you sure want to delete Associates with Client?',
  COMPETIORS_DELETED: 'Are you sure want to delete this competitor details?',
  COMPLETED_PROJECT_DELETED: 'Are you sure want to delete completed project?',
  ASSOCIATION_WITH_SUB_CONSULTANT_DELETE:
    'Are you sure want to delete Association with Sub Consultant?',
  ONGOING_PROJECT_DELETE: 'Are you sure want to delete ongoing project?',
  ONGOING_PROJECT_TASK_DELETE: 'Are you sure want to delete project task?',
  ONGOING_PROJECT_SUBTASK_DELETE:
    'Are you sure want to delete project sub task?',

  ONGOING_PROJECT_COMPLETE:
    'All tasks under this project will be marked as Completed and this project will be moved to Completed Projects.',
  MARK_AS_RESOLVED: 'Are you sure want to mark as resolved this message?',
  CLOSED: 'Are you sure want to closed this request?',
  CHECKOUT_REQUEST_APPROVE: 'Are you sure want to approve check out request ?',
  CHECKOUT_REQUEST_REJECT: 'Are you sure want to reject check out request ?',
  PASSWORD_CHANGE: 'Are you sure want to change your password ?',
  PENDING_PASSWORD_CHANGE: 'Your password change request is pending.',
  PASSWORD_CHANGE_APPROVE:
    'Are you sure want to approve password change request ?',
  PASSWORD_CHANGE_REJECT:
    'Are you sure want to reject password change request ?',
  BOOKING_DELETE: 'Are you sure want to delete this booking?',
  AMC_DELETE: 'Are you sure want to delete this amc?',
};

export const DEPARTMENT = {
  DEPARTMENT_SUCCESS: 'Department added successfully',
  DEPARTMENT_UPDATE: 'Department updated successfully',
  DEPARTMENT_DELETE: 'Department deleted successfully',
};

export const SALARY_MESSAGES = {
  SALARY_UPLOAD_SUCCESS: 'Salary slip uploaded successfully',
};

export const ONGOING_PROJECT = {
  ONGOING_PROJECT_DELETE: 'Ongoing project deleted successfully',
  ONGOING_PROJECT_TASK_DELETE: 'Project task deleted successfully',
  ONGOING_PROJECT_SUBTASK_DELETE: 'Project sub task deleted successfully',
};

export const DOCUMENT_MESSAGES = {
  PROPERTY_DOCUMENTS: {
    PROPERTY_DOCUMENT_DELETED: 'Property documents deleted successfully',
  },
  BANK_GUARANTEE: {
    BANK_GUARANTEE_UPDATE: 'Bank guarantee updated successfully',
    BANK_GUARANTEE_ADDED: 'Bank guarantee has been added successfully',
    BANK_GUARANTEE_DELETE: 'Bank guarantee deleted successfully',
  },
  VEHICLE_DOCUMENTS: {
    VEHICLE_DOCUMENTS_UPDATE: 'Vehicle documents updated successfully',
    VEHICLE_DOCUMENTS_ADDED: 'Vehicle documents has been added successfully',
    VEHICLE_DOCUMENTS_DELETE: 'Vehicle documents deleted successfully',
  },
  COMPANY_DIRECTOR: {
    COMPANY_DIRECTOR_ADDED: 'Company Director added successfully',
    COMPANY_DIRECTOR_UPDATED: 'Company Director updated successfully',
    COMPANY_DIRECTOR_DELETE: 'Director deleted successfully',
  },
  COMPANY_INFO: {
    COMPANY_INFO_ADDED: 'Company Information added successfully',
    COMPANY_INFO_UPDATED: 'Company Information updated successfully',
  },
};

export const RAISE_REQUEST = {
  RAISE_REQUEST_ADD: 'Raise Request added successfully',
};

export const MESSAGE_REPLY = {
  REPLY_ADD: 'Reply added successfully',
};

export const ASSOCIATION_VENDORS = {
  ASSOCIATION_WITH_JOINT_VENTURES: {
    ASSOCIATION_WITH_JOINT_VENTURES_DELETED:
      'Association with joint venture deleted successfully',
    ASSOCIATION_WITH_JOINT_VENTURES_CREATED:
      'Association with joint venture added successfully',
    ASSOCIATION_WITH_JOINT_VENTURES_UPDATED:
      'Association with joint venture updated successfully',
  },
  COMPETITORS: {
    COMPEITETORS_DELETED: 'Competitor deleted successfully',
    COMPEITETORS_CREATED: 'Competitor added successfully',
    COMPEITETORS_UPDATED: 'Competitor updated successfully',
  },

  ASSOCIATION_WITH_CLIENTS: {
    ASSOCIATION_WITH_CLIENTS_ADDED:
      'Association with client added successfully',
    ASSOCIATION_WITH_CLIENTS_UPDATED:
      'Association with client updated successfully',
    ASSOCIATION_WITH_CLIENTS_DELETE:
      'Association with client deleted successfully',
  },
  ASSOCIATES_WITH_CLIENT: {
    ASSOCIATES_WITH_CLIENT_DELETED:
      'Associates with client deleted successfully',
    ASSOCIATES_WITH_CLIENT_CREATED: 'Associates with client added successfully',
    ASSOCIATES_WITH_CLIENT_UPDATED:
      'Associates with client updated successfully',
  },

  SUB_CONSULTANT: {
    SUB_CONSULTANT_ADDED: 'Sub Consultant added successfully',
    SUB_CONSULTANT_UPDATED: 'Sub Consultant updated successfully',
    SUB_CONSULTANT_DELETE: 'Sub Consultant deleted successfully',
  },
  ASSOCIATION_WITH_SUB_CONSULTANT: {
    ASSOCIATION_WITH_SUB_CONSULTANT_ADDED:
      'Association with sub Consultant added successfully',
    ASSOCIATION_WITH_SUB_CONSULTANT_UPDATED:
      'Association with sub Consultant updated successfully',
    ASSOCIATION_WITH_SUB_CONSULTANT_DELETE:
      'Association with sub Consultant deleted successfully',
  },
};

export const AREA_OF_INTEREST = {
  AREA_OF_INTEREST_CREATE_SUCCESS: 'Area of interest added successfully',
  AREA_OF_INTEREST_UPDATE_SUCCESS: 'Area of interest updated successfully',
  AREA_OF_INTEREST_DELETE_SUCCESS: 'Area of interest deleted successfully',
};

export const BANKS = {
  BANKS_CREATE_SUCCESS: 'Banks added successfully',
  BANKS_UPDATE_SUCCESS: 'Banks updated successfully',
  BANKS_DELETE_SUCCESS: 'Banks deleted successfully',
};

export const PROJECT_TYPE = {
  PROJECT_TYPE_CREATE_SUCCESS: 'Project Type added successfully',
  PROJECT_TYPE_UPDATE_SUCCESS: 'Project Type updated successfully',
};

export const RESIGNATION_MESSAGE = {
  RESIGNATION_SUCCESS: 'Resignation applied successfully',
  RESIGNATION_UPDATE: 'Resignation updated successfully',
};

export const BUSINESS_DEVELOPMENT = {
  BUSINESS_DEVELOPMENT_DELETED: 'Business development deleted successfully',
};

export const BOOKING = {
  BOOKING_DELETED: 'Booking deleted successfully',
};

export const AMC = {
  AMC_DELETED: 'Amc deleted successfully',
};

export const COMPLETED_PROJECT = {
  COMPLETED_PROJECT_CREATE_SUCCESS: 'Completed project added successfully',
  COMPLETED_PROJECT_UPDATE_SUCCESS: 'Complete project updated successfully',
  COMPLETED_PROJECT_DELETE_SUCCESS: 'Complete project deleted successfully',
};

export const FileTypes = {
  JPG_MIME_TYPE: 'image/jpg',
  JPEG_MIME_TYPE: 'image/jpeg',
  PNG_MIME_TYPE: 'image/png',
  PDF_MIME_TYPE: 'application/pdf',
};
export const BUTTON_LABELS = {
  UPDATE: 'Update',
  CLOSE: 'Close',
  ADD: 'Add',
  CANCEL: 'Cancel',
  EDIT: 'Edit',
};
export const TransactionTypeOptions = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Bank', value: 'BANK' },
];

export const TransactionOptions = [
  { label: 'From', value: 'From' },
  { label: 'To', value: 'To' },
];

export const PaymentTypeOptions = [
  { label: 'Cash', value: 'CASH' },
  { label: 'Online', value: 'ONLINE' },
];

export const ClientTypeOptions = [
  { label: 'Creditor', value: 'CREDITOR' },
  { label: 'Debtor', value: 'DEBTOR' },
];
export const PettyCashType = [
  { label: 'Through Pentacle', value: 'THROUGH_PENTACLE' },
  { label: 'Journal Entry', value: 'JOURNAL' },
];

export const isAllocatedTypeOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const LeaveType = [
  { label: 'Paid', value: 'PAID' },
  { label: 'Unpaid', value: 'UNPAID' },
];

export const DocumentTabList: TabData[] = [
  { key: 'official-documents', title: 'Official Documents' },
  { key: 'vehicle-documents', title: 'Vehicle Documents' },
  { key: 'property-documents', title: 'Property Documents' },
  { key: 'bank-guarantee', title: 'Bank Guarantee' },
];

export const AssociationAndVendorsList: TabData[] = [
  { key: 'sub-consultant', title: 'Sub Consultant' },
  { key: 'competitors', title: 'Competitors' },
  {
    key: 'association-with-joint-ventures',
    title: 'Association with Joint Ventures',
  },
  { key: 'association-with-clients', title: 'Association with Clients' },
];

export const Departmental_overview: TabData[] = [
  { key: 'designations', title: 'Designations' },
  { key: 'departments', title: 'Departments' },
];

export const ProfileMenuList: TabData[] = [
  { key: 'my-profile', title: 'Profile' },
  { key: 'my-leaves', title: 'Leaves' },
  { key: 'my-attendance', title: 'Attendance' },
  {
    key: 'my-reimbursements',
    title: 'Reimbursements',
  },
  { key: 'my-salaries', title: 'Salary Slip' },
  { key: 'change-password', title: 'Change Password' },
  { key: 'resignation', title: 'Resignation' },
];

export const AssociationWithJointVenturesTabList: TabData[] = [
  {
    key: 'AssociationWithJointVenturesInfo',
    title: 'Association With Joint Ventures Info',
  },
  { key: 'Documents', title: 'Documents' },
];

export const AssociationWithSubConsultantsTabList: TabData[] = [
  {
    key: 'AssociationWithSubConsultantsInfo',
    title: 'Association With Sub Consultant',
  },
  { key: 'Documents', title: 'Documents' },
];

export const CarDocumentTabList: TabData[] = [
  { key: 'carInformation', title: 'Vehicle Information' },
  { key: 'Documents', title: 'Documents' },
];

export const OngoingProjectTabList: TabData[] = [
  { key: 'ongoingProjectInformation', title: 'Ongoing Project Information' },
  { key: 'Documents', title: 'Documents' },
];

export const AssociatesWithClientDocumentTabList: TabData[] = [
  {
    key: 'AssocoatesWithClientInformation',
    title: 'Assocoates With Client Information',
  },
  { key: 'Documents', title: 'Documents' },
];

export const DirectorDocumentTabList: TabData[] = [
  { key: 'DirectorInformation', title: 'Director Information' },
  { key: 'Documents', title: 'Documents' },
];

export const OfficialDocumentTabList: TabData[] = [
  { key: 'companyInformation', title: 'Company Information' },
  { key: 'Documents', title: 'Documents' },
];

export const PropertyDocumentTabList: TabData[] = [
  { key: 'propertyDetails', title: 'Property Details' },
  { key: 'Documents', title: 'Documents' },
];

export const BusinessDevelopmentTabList: TabData[] = [
  { key: 'businessDevelopmentDetails', title: 'Business Development Details' },
  { key: 'Documents', title: 'Documents' },
];

export const BookingTabList: TabData[] = [
  { key: 'bookingDetails', title: 'Booking Details' },
  { key: 'Documents', title: 'Documents' },
];

export const AmcTabList: TabData[] = [
  { key: 'amcDetails', title: 'Amc Details' },
  { key: 'Documents', title: 'Documents' },
];

export const CompletedProjectTabList: TabData[] = [
  { key: 'completedProject', title: 'Completed Project Details' },
  { key: 'Documents', title: 'Documents' },
];

export const OfficeLocations = [
  { label: 'Head Office - Lower Parel', value: 'HEAD_OFFICE' },
  { label: 'MSRDC Pune', value: 'MSRDC_PUNE' },
  { label: 'MMRDA', value: 'MMRDA' },
  { label: 'MSRDC Mumbai', value: 'MSRDC Mumbai' },
  { label: 'Pune Regional Office', value: 'Pune_Regional_Office' },
];

export const OfficeLocationType = {
  OFFICE: 'OFFICE',
  ON_SITE: 'ON_SITE',
};

export const TrackStatus = [
  { label: 'Open', value: 'OPEN' },
  { label: 'Scheduled', value: 'SCHEDULED' },
  { label: 'In Progress', value: 'INPROGRESS' },
  { label: 'On Hold', value: 'ONHOLD' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Closed', value: 'CLOSED' },
];

export const BookingStatus = [
  { label: 'Submitted', value: 'SUBMITTED' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Rescheduled', value: 'RESCHEDULED' },
  { label: 'Upgraded', value: 'UPGRADED' },
];

export const PriorityStatus = [
  { label: 'Urgent', value: 'URGENT' },
  { label: 'High', value: 'HIGH' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'Low', value: 'LOW' },
];

export const PhaseStatus = [
  { label: 'Initial', value: 'INITIAL' },
  { label: 'Phase 1', value: 'PHASE_1' },
  { label: 'Phase 2', value: 'PHASE_2' },
  { label: 'Phase 3', value: 'PHASE_3' },
  { label: 'Phase 4', value: 'PHASE_4' },
  { label: 'Phase 5', value: 'PHASE_5' },
];

export const subTaskColumns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'AssigneeUser',
    label: 'Assignee User',
  },
  {
    key: 'startDate',
    label: 'Start Date',
  },
  {
    key: 'dueDate',
    label: 'Due Date',
  },
  {
    key: 'status',
    label: 'Staus',
  },
  {
    key: 'priority',
    label: 'Priority',
  },
  {
    key: 'phase',
    label: 'Phase',
  },
  {
    key: 'progress',
    label: 'Progress',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

export enum ColorCode {
  ANSWERED = 'ANSWERED',
  OPENED = 'OPENED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export const ATTENDANCE = {
  CHECKOUT_REQUEST_APPROVED_SUCCESS: 'Checkout request approved successfully',
  CHECKOUT_REQUEST_UPDATED_SUCCESS: 'Checkout request updated successfully',
  CHECKOUT_REQUEST_APPLY_SUCCESS: 'Checkout request apply successfully',
  CHECKOUT_REQUEST_REJECTED_SUCCESS: 'Checkout request reject successfully',
};

export const AttendenceTabList: TabData[] = [
  { key: 'all-attendance', title: 'All Attendance' },
  { key: 'pending-attendance', title: 'Pending Checkout' },
];

export const OfficeLocationTypeOption = [
  { label: 'Office', value: 'OFFICE' },
  { label: 'On Site', value: 'ON_SITE' },
];

export const CheckInStatus = {
  PENDING: 'PENDING',
  INCOMPLETE: 'INCOMPLETE',
  COMPLETE: 'COMPLETE',
  REQUESTED: 'REQUESTED',
};

export const AttendanceStatus = [
  { label: 'Incomplete', value: 'INCOMPLETE' },
  { label: 'Complete', value: 'COMPLETE' },
];

export const MonthsOptions = [
  { label: 'January', value: 'JANUARY' },
  { label: 'February', value: 'FEBRUARY' },
  { label: 'March', value: 'MARCH' },
  { label: 'April', value: 'APRIL' },
  { label: 'May', value: 'MAY' },
  { label: 'June', value: 'JUNE' },
  { label: 'July', value: 'JULY' },
  { label: 'August', value: 'AUGUST' },
  { label: 'September', value: 'SEPTEMBER' },
  { label: 'October', value: 'OCTOBER' },
  { label: 'November', value: 'NOVEMBER' },
  { label: 'December', value: 'DECEMBER' },
];

export const NoticePeriodStatusOptions = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
];
