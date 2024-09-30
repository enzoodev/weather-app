import { createAsyncThunk } from '@reduxjs/toolkit';

import { getLocations } from '@/query/locations/getLocations';
import { createLocation } from '@/query/locations/createLocation';
import { deleteLocation } from '@/query/locations/deleteLocation';

export const fetchLocationsAction = createAsyncThunk(
  'locations/fetchLocations',
  getLocations,
);

export const refetchLocationsAction = createAsyncThunk(
  'locations/refetchLocations',
  getLocations,
);

export const createLocationAction = createAsyncThunk(
  'locations/createLocation',
  createLocation,
);

export const deleteLocationAction = createAsyncThunk(
  'locations/deleteLocation',
  deleteLocation,
);
