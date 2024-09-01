import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice';
import userInfoReducer from './user-info/user-info-slice';
import notificationReducer from './notification/notification-slice';
import AmcReducer from '@/redux/amc/amcSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  userInfo: userInfoReducer,
  notification: notificationReducer,
  amc: AmcReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
