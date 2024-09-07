import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import {
  API_ENDPOINT,
  tableList,
  SortDirection,
  TABLE_LIST,
} from '@/utils/constant';
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
export const getTableList = createAsyncThunk(
  'tableList/getTableList',
  async (queryParameters, { rejectWithValue }) => {
    try {
      const {
        data: { data: tableListData, pageData: meta },
      } = await axiosInstance.post(API_ENDPOINT.GET_TABLE_LIST, {
        ...queryParameters,
      });
      return {
        tableListData,
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

export const addtableList = createAsyncThunk(
  'tableList/addtableList',
  async (tableListDetails, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.ADD_TABLE_LIST,
        tableListDetails,
      );
      toast.success(TABLE_LIST.TABLE_LIST_SUCCESS);
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updatetableList = createAsyncThunk(
  'tableList/updatetableList',
  async ({ id, payload }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.UPDATE_TABLE_LIST(id),
        payload,
      );
      toast.success(TABLE_LIST.TABLE_LIST_UPDATE);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const deletetableList = createAsyncThunk(
  'tableList/deletetableList',
  async ({ id }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.DELETE_TABLE_LIST(id),
      );
      toast.success(TABLE_LIST.TABLE_LIST_DELETED);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const updatetableListValues = createAsyncThunk(
  'tableList/updatetableListValues',
  async (defaultValues, { rejectWithValue }) => {
    try {
      return defaultValues;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const tableListSlice = createSlice({
  name: 'tableList',
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
      .addCase(getTableList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTableList.fulfilled, (state, action) => {
        state.data = action.payload.tableListData;
        state.total = action.payload.total;
        state.listParameters = action.payload.updatedListParams;
        state.loading = false;
      })
      .addCase(getTableList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addtableList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addtableList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(addtableList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatetableList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatetableList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(updatetableList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatetableListValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatetableListValues.fulfilled, (state, action) => {
        state.defaultValues = action.payload;
        state.loading = false;
      })
      .addCase(updatetableListValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateListParameters, setLoading } = tableListSlice.actions;

export default tableListSlice.reducer;
