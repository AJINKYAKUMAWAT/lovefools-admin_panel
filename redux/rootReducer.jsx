import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import userInfoReducer from './user-info/user-info-slice';
import ReceiptReducer from '@/redux/receipt/receiptSlice';
import TableListReducer from '@/redux/table-list/tableListSlice';
import ContactFormReducer from '@/redux/contact-form/contactFormSlice';
import UserListReducer from '@/redux/user-list/userListSlice';
import EventListReducer from '@/redux/event-list/eventListSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  receipt: ReceiptReducer,
  tableList: TableListReducer,
  contactForm: ContactFormReducer,
  userList: UserListReducer,
  eventList: EventListReducer,
});

export default rootReducer;
