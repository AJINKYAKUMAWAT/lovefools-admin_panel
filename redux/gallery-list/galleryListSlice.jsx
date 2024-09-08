import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import { API_ENDPOINT, GALLERY_LIST, SortDirection } from '@/utils/constant';
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
export const getGalleryList = createAsyncThunk(
  'galleryList/getGalleryList',
  async (queryParameters, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { data: galleryListData, pageData: meta },
      } = await axiosInstance.post(API_ENDPOINT.GET_GALLERY_LIST, {
        ...queryParameters,
      });
      return {
        galleryListData,
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

export const addGalleryList = createAsyncThunk(
  'galleryList/addGalleryList',
  async (galleryListDetails, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.ADD_GALLERY_LIST,
        galleryListDetails,
      );
      toast.success(GALLERY_LIST.GALLERY_LIST_SUCCESS);
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateGalleryList = createAsyncThunk(
  'galleryList/updateGalleryList',
  async ({ id, payload }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.UPDATE_GALLERY_LIST(id),
        payload,
      );
      toast.success(GALLERY_LIST.GALLERY_LIST_UPDATE);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const deleteGalleryList = createAsyncThunk(
  'galleryList/deleteGalleryList',
  async ({ id }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINT.DELETE_GALLERY_LIST(id),
      );
      toast.success(GALLERY_LIST.GALLERY_LIST_DELETED);
      return data;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  },
);

export const updateGalleryListValues = createAsyncThunk(
  'galleryList/updateGalleryListValues',
  async (defaultValues, { rejectWithValue }) => {
    try {
      return defaultValues;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const galleryListSlice = createSlice({
  name: 'galleryList',
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
      .addCase(getGalleryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGalleryList.fulfilled, (state, action) => {
        state.data = action.payload.galleryListData;
        state.total = action.payload.total;
        state.listParameters = action.payload.updatedListParams;
        state.loading = false;
      })
      .addCase(getGalleryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addGalleryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGalleryList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(addGalleryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateGalleryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGalleryList.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.defaultValues = action.payload || null;
        state.loading = false;
      })
      .addCase(updateGalleryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateGalleryListValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGalleryListValues.fulfilled, (state, action) => {
        state.defaultValues = action.payload;
        state.loading = false;
      })
      .addCase(updateGalleryListValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateListParameters, setLoading } = galleryListSlice.actions;

export default galleryListSlice.reducer;
