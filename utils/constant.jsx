export const API_ENDPOINT = {
  LOGIN: 'login',
  ADD_RECEIPT: 'addReceipt',
  UPDATE_RECEIPT: (id) => `updateReceipt/${id}`,
  DELETE_RECEIPT: (id) => `deleteReceipt/${id}`,
  GET_RECEIPT: 'getReceiptList',
  ADD_TABLE_LIST: 'addReceipt',
  UPDATE_TABLE_LIST: (id) => `updateReceipt/${id}`,
  DELETE_TABLE_LIST: (id) => `deleteReceipt/${id}`,
  GET_TABLE_LIST: 'getReceiptList',
  DELETE_CONTACT_FORM: (id) => `deleteReceipt/${id}`,
  GET_CONTACT_FORM: 'getReceiptList',
  ADD_USER_LIST: 'addReceipt',
  UPDATE_USER_LIST: (id) => `updateReceipt/${id}`,
  DELETE_USER_LIST: (id) => `deleteReceipt/${id}`,
  GET_USER_LIST: 'getReceiptList',
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
  USER_LIST_DELETED: 'User llist deleted successfully',
  USER_LIST_SUCCESS: 'User llist created successfully',
  USER_LIST_UPDATE: 'User llist updated successfully',
};

export const ERROR_MESSAGE = 'Something went wrong';

export const CONFIRMATION_MESSAGES = {
  RECEIPT_DELETE: 'Are you sure want to delete this receipt?',
  TABLE_LIST_DELETE: 'Are you sure want to delete this table list?',
  CONTACT_FORM_DELETE: 'Are you sure want to delete this contact form?',
  USER_LIST_DELETE: 'Are you sure want to delete this user list?',
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
