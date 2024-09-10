export const API_ENDPOINT = {
  LOGIN: 'login',
  ADD_RECEIPT: 'addReceipt',
  UPDATE_RECEIPT: (id) => `updateReceipt/${id}`,
  DELETE_RECEIPT: (id) => `deleteReceipt/${id}`,
  GET_RECEIPT: 'getReceiptList',
  ADD_TABLE_LIST: 'addTable',
  UPDATE_TABLE_LIST: (id) => `updateTable/${id}`,
  DELETE_TABLE_LIST: (id) => `deleteTable/${id}`,
  GET_TABLE_LIST: 'getTableList',
  DELETE_CONTACT_FORM: (id) => `deleteReceipt/${id}`,
  GET_CONTACT_FORM: 'getReceiptList',
  ADD_USER_LIST: 'addUserInformation',
  UPDATE_USER_LIST: (id) => `updateUserInformation/${id}`,
  DELETE_USER_LIST: (id) => `deleteUserInformation/${id}`,
  GET_USER_LIST: 'getUserInformationList',
  ADD_EVENT_LIST: 'addEvent',
  UPDATE_EVENT_LIST: (id) => `updateEvent/${id}`,
  DELETE_EVENT_LIST: (id) => `deleteEvent/${id}`,
  GET_EVENT_LIST: 'getEventList',
  ADD_GALLERY_LIST: 'addReceipt',
  UPDATE_GALLERY_LIST: (id) => `updateReceipt/${id}`,
  DELETE_GALLERY_LIST: (id) => `deleteReceipt/${id}`,
  GET_GALLERY_LIST: 'getReceiptList',
  ADD_TESTIMONIAL_LIST: 'addReceipt',
  UPDATE_TESTIMONIAL_LIST: (id) => `updateReceipt/${id}`,
  DELETE_TESTIMONIAL_LIST: (id) => `deleteReceipt/${id}`,
  GET_TESTIMONIAL_LIST: 'getReceiptList',
  ADD_CMS_LIST: 'addReceipt',
  UPDATE_CMS_LIST: (id) => `updateReceipt/${id}`,
  DELETE_CMS_LIST: (id) => `deleteReceipt/${id}`,
  GET_CMS_LIST: 'getReceiptList',
};

export const SortDirection = {
  ASC: 1,
  DESC: -1,
};

export const RECEIPT = {
  RECEIPT_DELETED: 'Receipt deleted successfully',
  RECEIPT_SUCCESS: 'Receipt created successfully',
  RECEIPT_UPDATE: 'Receipt updated successfully',
};

export const TABLE_LIST = {
  TABLE_LIST_DELETED: 'Table list deleted successfully',
  TABLE_LIST_SUCCESS: 'Table list created successfully',
  TABLE_LIST_UPDATE: 'Table list updated successfully',
};

export const CONTACT_FORM = {
  CONTACT_FORM_DELETED: 'Contact form deleted successfully',
  CONTACT_FORM_SUCCESS: 'Contact form created successfully',
  CONTACT_FORM_UPDATE: 'Contact form updated successfully',
};

export const USER_LIST = {
  USER_LIST_DELETED: 'User list deleted successfully',
  USER_LIST_SUCCESS: 'User list created successfully',
  USER_LIST_UPDATE: 'User list updated successfully',
};

export const EVENT_LIST = {
  EVENT_LIST_DELETED: 'Event list deleted successfully',
  EVENT_LIST_SUCCESS: 'Event list created successfully',
  EVENT_LIST_UPDATE: 'Event list updated successfully',
};

export const CMS_LIST = {
  CMS_LIST_UPDATE: 'CMS list updated successfully',
};

export const GALLERY_LIST = {
  GALLERY_LIST_DELETED: 'Gallery list deleted successfully',
  GALLERY_LIST_SUCCESS: 'Gallery list created successfully',
  GALLERY_LIST_UPDATE: 'Gallery list updated successfully',
};

export const TESTIMONIAL_LIST = {
  TESTIMONIAL_LIST_DELETED: 'Testimonial list deleted successfully',
  TESTIMONIAL_LIST_SUCCESS: 'Testimonial list created successfully',
  TESTIMONIAL_LIST_UPDATE: 'Testimonial list updated successfully',
};

export const ERROR_MESSAGE = 'Something went wrong';

export const CONFIRMATION_MESSAGES = {
  RECEIPT_DELETE: 'Are you sure want to delete this receipt?',
  TABLE_LIST_DELETE: 'Are you sure want to delete this table list?',
  CONTACT_FORM_DELETE: 'Are you sure want to delete this contact form?',
  USER_LIST_DELETE: 'Are you sure want to delete this user list?',
  EVENT_LIST_DELETE: 'Are you sure want to delete this event list?',
  GALLERY_LIST_DELETE: 'Are you sure want to delete this gallery list?',
  TESTIMONIAL_LIST_DELETE: 'Are you sure want to delete this Testimonial list?',
};

export const menuType = [
  {
    id: '1',
    type: 'Ala Carte',
  },
  {
    id: '2',
    type: 'Set Menu',
  },
];

export const subMenuType = [
  {
    id: '1',
    type: 'Veg',
  },
  {
    id: '2',
    type: 'Non-Veg',
  },
  ,
  {
    id: '3',
    type: 'Drink',
  },
];

export const statusType = [
  {
    id: '1',
    type: 'Done',
  },
  {
    id: '2',
    type: 'Upcoming',
  },
];

export const galleryType = [
  {
    id: '1',
    type: 'Photo',
  },
  {
    id: '2',
    type: 'Video',
  },
];
