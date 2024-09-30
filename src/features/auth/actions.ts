import { createAsyncThunk } from '@reduxjs/toolkit';

import { login } from '@/query/auth/login';

export const loginAction = createAsyncThunk('auth/login', login);

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('logout');
});
