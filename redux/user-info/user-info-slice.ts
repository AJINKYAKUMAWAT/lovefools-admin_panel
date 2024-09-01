import axiosInstance from '@/utils/axios';
import { API_ENDPOINT } from '@/utils/constant';
import { createSlice } from '@reduxjs/toolkit';

interface Role {
  id: number;
  roleName: string;
}

interface User {
  id: string;
  employeeId: string;
  fullName: string;
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
  gender: string;
  roles: Role[];
  profileImageUrl: string;
  isPasswordChangeRequest: boolean;
}

export interface UserInfoState {
  user: User | null;
}

const initialState: UserInfoState = {
  user: null,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;

export const getLoggedInUsersDetails = async () => {
  try {
    const data = {
      fullName: 'Ajinkya',
    };
    // const { data } = await axiosInstance.get(API_ENDPOINT.LOGGEDIN_USER);
    return data;
  } catch (error) {
    throw error;
  }
};
