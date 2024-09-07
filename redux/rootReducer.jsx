import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import userInfoReducer from './user-info/user-info-slice';
import ReceiptReducer from '@/redux/receipt/receiptSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  receipt: ReceiptReducer,
});

export default rootReducer;
