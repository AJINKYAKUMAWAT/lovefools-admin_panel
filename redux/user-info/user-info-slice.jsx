import axiosInstance from '@/utils/axios';
import { API_ENDPOINT } from '@/utils/constant';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
