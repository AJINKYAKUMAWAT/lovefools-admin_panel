import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  message: '',
  variant: 'success',
  loading: false,
  error: null,
};

// Async thunks
export const showNotificationAsync = createAsyncThunk(
  'notification/showNotificationAsync',
  async ({ message, variant }, { rejectWithValue }) => {
    try {
      // Simulating an asynchronous operation like logging or notification request
      return { message, variant };
    } catch (error) {
      return rejectWithValue('Error showing notification');
    }
  },
);

export const hideNotificationAsync = createAsyncThunk(
  'notification/hideNotificationAsync',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate an async action for hiding a notification
      return true;
    } catch (error) {
      return rejectWithValue('Error hiding notification');
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // showNotificationAsync
      .addCase(showNotificationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showNotificationAsync.fulfilled, (state, action) => {
        state.isOpen = true;
        state.message = action.payload.message;
        state.variant = action.payload.variant || 'success';
        state.loading = false;
      })
      .addCase(showNotificationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // hideNotificationAsync
      .addCase(hideNotificationAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hideNotificationAsync.fulfilled, (state) => {
        state.isOpen = false;
        state.message = '';
        state.variant = '';
        state.loading = false;
      })
      .addCase(hideNotificationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading } = notificationSlice.actions;
export default notificationSlice.reducer;
