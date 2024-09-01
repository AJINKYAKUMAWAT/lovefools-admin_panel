import { createSlice } from '@reduxjs/toolkit';
import {
  getLoggedInUsersDetails,
  removeUser,
  setUser,
} from '../user-info/user-info-slice';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import axiosInstance from '@/utils/axios';
import { API_ENDPOINT } from '@/utils/constant';
import { AppDispatch } from '../store';
import axios from 'axios';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  accessToken: string;
  isInitialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  isInitialized: false,
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = '';
      state.isAuthenticated = false;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setAuthLoading, login, logout, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;

const getToken = async (credentails?: any) => {
  try {
    const accessToken = getCookie('token');
    const refreshToken = getCookie('refreshToken');
    if (accessToken && refreshToken) return { accessToken, refreshToken };

    const data = await axios.post(
      'http://localhost:5000/api/user/login',
      credentails,
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const handleLogin =
  (credentails?: any) => async (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));

    try {
      const loginResponse = await getToken(credentails);

      setCookie('isAuthenticated', true);
      setCookie('token', loginResponse.accessToken);
      setCookie('refreshToken', loginResponse.refreshToken);

      const userResponse = await getLoggedInUsersDetails();

      dispatch(login({ ...loginResponse }));
      dispatch(
        setUser({
          ...userResponse,
        }),
      );
      dispatch(setAuthLoading(false));
    } catch (error) {
      dispatch(handleLogout());
      dispatch(setAuthLoading(false));
      throw error;
    }
  };

export const handleLogout = () => (dispatch: AppDispatch) => {
  deleteCookie('isAuthenticated');
  deleteCookie('token');
  deleteCookie('refreshToken');
  dispatch(logout());
  dispatch(removeUser());
};
