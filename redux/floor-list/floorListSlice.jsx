import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import { API_ENDPOINT, FLOOR_LIST, SortDirection } from '@/utils/constant';
import { toast } from 'react-toastify';

const initialListParameters = {
  page: 1,
  limit: 10,
  sortBy: 'id',
  sortOrder: SortDirection.DESC,
  search: '',
};

const initialState = {
  data: [],
  defaultValues: null,
  total: 0,
  loading: false,
  error: null,
  listParameters: initialListParameters,
  tab: '',
};

// Async thunks
export const getFloorList = createAsyncThunk(
  'floorList/getFloorList',
  async (queryParameters, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { data: floorListData, pageData: meta },
      } = await axiosInstance.post(API_ENDPOINT.GET_FLOOR_LIST, {
        ...queryParameters,
      });
      return {
        floorListData,
        total: meta.total,
        updatedListParams: {
          ...queryParameters,
          page: meta.page,
          limit: meta.limit,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addFloorList = createAsyncThunk(
  'floorList/addFloorList',
  async (floorListDetails, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINT.ADD_FLOOR_LIST, {
        ...floorListDetails,
      });
      toast.success(FLOOR_LIST.FLOOR_LIST_SUCCESS);
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateFloorList = createAsyncThunk(
  'floorList/updateFloorList',
  async ({ id, payload }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.UPDATE_FLOOR_LIST(id),
        { ...payload },
      );
      toast.success(FLOOR_LIST.FLOOR_LIST_UPDATE);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const deleteFloorList = createAsyncThunk(
  'floorList/deleteFloorList',
  async ({ id }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.DELETE_FLOOR_LIST(id),
      );
      toast.success(FLOOR_LIST.FLOOR_LIST_DELETED);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const updateFloortListValues = createAsyncThunk(
  'floorList/updateFloortListValues',
  async (defaultValues, { rejectWithValue }) => {
    try {
      return defaultValues;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const floorListSlice = createSlice({
  name: 'floorList',
  initialState,
  reducers: {
    updateListParameters: (state, action) => {
      state.listParameters = { ...state.listParameters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFloorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFloorList.fulfilled, (state, action) => {
        state.data = action.payload.floorListData;
        state.total = action.payload.total;
        state.listParameters = action.payload.updatedListParams;
        state.loading = false;
      })
      .addCase(getFloorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addFloorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFloorList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(addFloorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateFloorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFloorList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(updateFloorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateFloortListValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFloortListValues.fulfilled, (state, action) => {
        state.defaultValues = action.payload;
        state.loading = false;
      })
      .addCase(updateFloortListValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateListParameters, setLoading } = floorListSlice.actions;

export default floorListSlice.reducer;
