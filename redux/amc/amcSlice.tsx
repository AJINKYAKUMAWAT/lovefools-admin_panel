import { ListParameters, SortDirection } from '@/types/baseTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import axiosInstance from '@/utils/axios';
import { API_ENDPOINT, ERROR_MESSAGES } from '@/utils/constant';
import { AmcInput, AmcQueryParams } from '@/types/amc';
import { showNotification } from '../notification/notification-slice';

interface AmcState {
  data: AmcInput[];
  selectAmc: AmcInput | null;
  defaultValues: AmcInput | null;
  total: number;
  loading: boolean;
  error: string | null;
  listParameters: AmcQueryParams;
  tab: string;
}

const initialListParameters: ListParameters = {
  page: 1,
  limit: 10,
  sortBy: 'id',
  sortOrder: SortDirection.DESC,
  search: '',
};

const initialState: AmcState = {
  data: [],
  selectAmc: null,
  defaultValues: null,
  total: 0,
  loading: false,
  error: null,
  listParameters: initialListParameters,
  tab: '',
};

const amcSlice = createSlice({
  name: 'amc',
  initialState,
  reducers: {
    updateListParameters: (state, action: PayloadAction<ListParameters>) => {
      state.listParameters = { ...state.listParameters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    getAmcSuccess: (
      state,
      action: PayloadAction<{
        amcData: AmcInput[];
        total: number;
        updatedListParams: Partial<ListParameters>;
      }>,
    ) => {
      state.error = null;
      state.data = action.payload.amcData;
      state.total = action.payload.total;
      state.listParameters = {
        ...state.listParameters,
        ...action.payload.updatedListParams,
      };
      state.loading = false;
    },
    getAmcData: (
      state,
      action: PayloadAction<{
        amcData: AmcInput[];
        selectAmc: AmcInput | null;
      }>,
    ) => {
      state.error = null;
      state.data = action.payload.amcData;
      state.selectAmc = action.payload.selectAmc;
      state.loading = false;
    },
    getCurrentTab: (
      state,
      action: PayloadAction<{
        tab: string;
      }>,
    ) => {
      state.error = null;
      state.tab = action.payload.tab;
      state.loading = false;
    },
    getCurrentValues: (
      state,
      action: PayloadAction<{
        defaultValues: AmcInput;
      }>,
    ) => {
      state.error = null;
      state.defaultValues = action.payload.defaultValues;
      state.loading = false;
    },
  },
});

export const {
  updateListParameters,
  getAmcSuccess,
  setLoading,
  getAmcData,
  getCurrentTab,
  getCurrentValues,
} = amcSlice.actions;

export const getAmcDetails = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(setLoading({ loading: true }));
  try {
    const response = await axiosInstance.get(API_ENDPOINT.AMC_UPDATE(id));

    dispatch(
      getAmcData({
        amcData: response.data || [],
        selectAmc: response.data || null,
      }),
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAmcList =
  (queryParameters: Partial<AmcQueryParams>) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      const {
        data: { data: amctData, pageData: meta },
      } = await axiosInstance.get(API_ENDPOINT.AMC, {
        params: queryParameters,
      });
      dispatch(
        getAmcSuccess({
          amcData: amctData,
          total: meta.total,
          updatedListParams: {
            ...queryParameters,
            page: meta.page,
            limit: meta.limit,
          },
        }),
      );
    } catch (error) {
      dispatch(setLoading({ loading: false }));
      if (error instanceof Error) {
        dispatch(
          showNotification({
            message: error.message,
            variant: 'error',
          }),
        );
      } else {
        dispatch(
          showNotification({
            message: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
            variant: 'error',
          }),
        );
      }
    }
  };

export const addAmc =
  (amcDetails: AmcInput) => async (dispatch: AppDispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      const { data } = await axiosInstance.post(API_ENDPOINT.AMC, amcDetails);

      dispatch(
        getAmcData({
          amcData: data || [],
          selectAmc: data || null,
        }),
      );
      dispatch(setLoading({ loading: false }));

      return data;
    } catch (error) {
      throw error;
    }
  };

export const updateAmc =
  (id: number, amcDetails: AmcInput) => async (dispatch: AppDispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      const { data } = await axiosInstance.patch(
        API_ENDPOINT.AMC_UPDATE(id),
        amcDetails,
      );

      dispatch(
        getAmcData({
          amcData: data || [],
          selectAmc: data || null,
        }),
      );
      dispatch(setLoading({ loading: false }));

      return data;
    } catch (error) {
      throw error;
    }
  };

export const updateAmcValues =
  (defaultValues: AmcInput) => async (dispatch: AppDispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      dispatch(getCurrentValues({ defaultValues: defaultValues }));
      dispatch(setLoading({ loading: false }));
    } catch (error) {
      throw error;
    }
  };

export const updateTab = (name: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading({ loading: true }));
  try {
    dispatch(
      getCurrentTab({
        tab: name,
      }),
    );
  } catch (error) {
    throw error;
  }
};

export const getSingleAmcDetails =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(setLoading({ loading: true }));
    try {
      const response = await axiosInstance.get(API_ENDPOINT.AMC_UPDATE(id));
      dispatch(
        getAmcData({
          amcData: response.data || [],
          selectAmc: response.data || null,
        }),
      );
      dispatch(setLoading({ loading: false }));

      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const removeAmc = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading({ loading: true }));
  try {
    dispatch(
      getAmcData({
        amcData: [],
        selectAmc: null,
      }),
    );
    dispatch(setLoading({ loading: false }));
  } catch (error) {
    throw error;
  }
};

export default amcSlice.reducer;
