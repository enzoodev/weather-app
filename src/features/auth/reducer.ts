import { createSlice } from '@reduxjs/toolkit';
import { TAuth } from '@/domain/entities/Auth';
import { loginAction, logoutAction } from './actions';

const initialState = {
  isLoadingLogin: false,
  isLoadingLogout: false,
  auth: null as TAuth | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginAction.pending, state => {
      state.isLoadingLogin = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.auth = action.payload;
      state.isLoadingLogin = false;
    });
    builder.addCase(loginAction.rejected, state => {
      state.isLoadingLogin = false;
    });
    builder.addCase(logoutAction.pending, state => {
      state.isLoadingLogout = true;
    });
    builder.addCase(logoutAction.fulfilled, state => {
      state.auth = null;
      state.isLoadingLogout = false;
    });
    builder.addCase(logoutAction.rejected, state => {
      state.isLoadingLogout = false;
    });
  },
});

export const authReducer = authSlice.reducer;
