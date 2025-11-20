import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '@api';
import type { RootState } from '../store';

type OrderHistoryState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

type PublicFeedState = OrderHistoryState & {
  total: number;
  totalToday: number;
};

export interface OrderFeedState {
  general: PublicFeedState;
  profile: OrderHistoryState;
}

const initialState: OrderFeedState = {
  general: {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  },
  profile: {
    orders: [],
    loading: false,
    error: null
  }
};

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchUserOrders = createAsyncThunk(
  'feed/fetchUserOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Публичная лента
      .addCase(fetchFeeds.pending, (state) => {
        state.general.loading = true;
        state.general.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.general.loading = false;
        state.general.orders = action.payload.orders;
        state.general.total = action.payload.total;
        state.general.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.general.loading = false;
        state.general.error = action.error.message || 'Failed to fetch feeds';
      })

      // История пользователя
      .addCase(fetchUserOrders.pending, (state) => {
        state.profile.loading = true;
        state.profile.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.profile.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.profile.loading = false;
        state.profile.error =
          action.error.message || 'Failed to fetch user orders';
      });
  }
});

export default feedSlice.reducer;
