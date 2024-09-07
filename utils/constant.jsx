export const API_ENDPOINT = {
  LOGIN: 'login',
  ADD_RECEIPT: 'addReceipt',
  UPDATE_RECEIPT: (id) => `updateReceipt/${id}`,
  DELETE_RECEIPT: (id) => `deleteReceipt/${id}`,
  GET_RECEIPT: 'getReceiptList',
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

export const ERROR_MESSAGE = 'Something went wrong';

export const CONFIRMATION_MESSAGES = {
  RECEIPT_DELETE: 'Are you sure want to delete this receipt?',
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
