import { createSlice } from '@reduxjs/toolkit';

export interface notificationState {
  isOpen: boolean;
  message: string;
  variant: string;
}

const initialState: notificationState = {
  isOpen: false,
  message: '',
  variant: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.variant = action.payload.variant
        ? action.payload.variant
        : state.variant;
    },
    hideNotification: (state) => {
      state.isOpen = false;
      state.message = '';
      state.variant = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
