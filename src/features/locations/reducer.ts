import { createSlice } from '@reduxjs/toolkit';
import { TLocation } from '@/domain/entities/Location';
import {
  createLocationAction,
  deleteLocationAction,
  fetchLocationsAction,
  refetchLocationsAction,
} from './actions';

const initialState = {
  isLoading: true,
  isLoadingRequest: false,
  isRefetching: false,
  data: [] as TLocation[],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLocationsAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchLocationsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLocationsAction.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(refetchLocationsAction.pending, state => {
      state.isRefetching = true;
    });
    builder.addCase(refetchLocationsAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isRefetching = false;
    });
    builder.addCase(refetchLocationsAction.rejected, state => {
      state.isRefetching = false;
    });
    builder.addCase(createLocationAction.pending, state => {
      state.isLoadingRequest = true;
    });
    builder.addCase(createLocationAction.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
      state.isLoadingRequest = false;
    });
    builder.addCase(createLocationAction.rejected, state => {
      state.isLoadingRequest = false;
    });
    builder.addCase(deleteLocationAction.pending, (state, action) => {
      const id = action.meta.arg;
      const index = state.data.findIndex(location => location.id === id);

      if (index !== -1) {
        state.data[index].isLoadingDelete = true;
      }
    });
    builder.addCase(deleteLocationAction.fulfilled, (state, action) => {
      state.data = state.data.filter(
        location => location.id !== action.meta.arg,
      );
    });
    builder.addCase(deleteLocationAction.rejected, (state, action) => {
      const id = action.meta.arg;
      const index = state.data.findIndex(location => location.id === id);

      if (index !== -1) {
        state.data[index].isLoadingDelete = false;
      }
    });
  },
});

export const locationsReducer = locationsSlice.reducer;
