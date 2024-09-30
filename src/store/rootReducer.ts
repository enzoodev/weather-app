import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/features/auth/reducer';
import { locationsReducer } from '@/features/locations/reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  locations: locationsReducer,
});
