import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type OrderState = {
  loading: boolean;
  error: string | null;
  modalData: TOrder | null;
  current: TOrder | null;
};

const initialState: OrderState = {
  loading: false,
  error: null,
  modalData: null,
  current: null
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredientIds);
      return data.order;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'order failed');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      return data.orders[0] ?? null;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'order load failed');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.modalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.modalData = action.payload ?? null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || null;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload ?? null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || null;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
