import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import {
  API_ENDPOINT,
  GALLERY_LIST,
  SortDirection,
  TESTIMONIAL_LIST,
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
};

// Async thunks
export const getTestimonialList = createAsyncThunk(
  'testimonialList/getTestimonialList',
  async (queryParameters, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { data: tesimonialListData, pageData: meta },
      } = await axiosInstance.post(API_ENDPOINT.GET_TESTIMONIAL_LIST, {
        ...queryParameters,
      });
      return {
        tesimonialListData,
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

export const addTesimonialList = createAsyncThunk(
  'testimonialList/addTesimonialList',
  async (tesimonialListDetails, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.ADD_TESTIMONIAL_LIST,
        tesimonialListDetails,
      );
      toast.success(TESTIMONIAL_LIST.TESTIMONIAL_LIST_SUCCESS);
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateTestimonialList = createAsyncThunk(
  'testimonialList/updateTestimonialList',
  async ({ id, payload }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.UPDATE_TESTIMONIAL_LIST(id),
        payload,
      );
      toast.success(TESTIMONIAL_LIST.TESTIMONIAL_LIST_UPDATE);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const deleteTestimonialList = createAsyncThunk(
  'testimonialList/deleteTestimonialList',
  async ({ id }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.DELETE_TESTIMONIAL_LIST(id),
      );
      toast.success(TESTIMONIAL_LIST.TESTIMONIAL_LIST_DELETED);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const updateTestimonialListValues = createAsyncThunk(
  'testimonialList/updateTestimonialListValues',
  async (defaultValues, { rejectWithValue }) => {
    try {
      return defaultValues;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const tesimonialListSlice = createSlice({
  name: 'testimonialList',
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
      .addCase(getTestimonialList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonialList.fulfilled, (state, action) => {
        state.data = action.payload.tesimonialListData;
        state.total = action.payload.total;
        state.listParameters = action.payload.updatedListParams;
        state.loading = false;
      })
      .addCase(getTestimonialList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTesimonialList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTesimonialList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(addTesimonialList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTestimonialList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonialList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(updateTestimonialList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTestimonialListValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonialListValues.fulfilled, (state, action) => {
        state.defaultValues = action.payload;
        state.loading = false;
      })
      .addCase(updateTestimonialListValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateListParameters, setLoading } = tesimonialListSlice.actions;

export default tesimonialListSlice.reducer;
