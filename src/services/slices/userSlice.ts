import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { setCookie } from '../../utils/cookie';
import { TLoginData, TRegisterData } from '@api';
import { TUser } from '@utils-types';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'getUser failed');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (payload: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(payload);
      if (data.accessToken) setCookie('accessToken', data.accessToken);
      if (data.refreshToken)
        localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'login failed');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (payload: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(payload);
      if (data.accessToken) setCookie('accessToken', data.accessToken);
      if (data.refreshToken)
        localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'register failed');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (payload: Partial<TUser>, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(payload);
      return data.user;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'update failed');
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  // Очистка токенов
  setCookie('accessToken', '', { expires: -1 });
  localStorage.removeItem('refreshToken');
  return null; // Явно возвращаем null вместо undefined
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = true; // даже при ошибке отметим как проверено
        state.error =
          (action.payload as string) || action.error.message || null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload ?? null;
        state.isAuthChecked = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;

export default userSlice.reducer;
