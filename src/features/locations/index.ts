import { useCallback } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { CreateLocationParams } from '@/query/locations/createLocation';

import {
  createLocationAction,
  deleteLocationAction,
  fetchLocationsAction,
} from './actions';

export const useLocations = () => {
  const dispatch = useAppDispatch();
  const locations = useAppSelector(state => state.locations);

  const getLocation = useCallback(
    (id: number) => {
      return locations.data.find(location => location.id === id);
    },
    [locations.data],
  );

  const fetchLocations = useCallback(async () => {
    await dispatch(fetchLocationsAction()).unwrap();
  }, [dispatch]);

  const refetchLocations = useCallback(async () => {
    await dispatch(fetchLocationsAction()).unwrap();
  }, [dispatch]);

  const createLocation = useCallback(
    async (data: CreateLocationParams) => {
      await dispatch(createLocationAction(data)).unwrap();
    },
    [dispatch],
  );

  const deleteLocation = useCallback(
    async (id: number) => {
      await dispatch(deleteLocationAction(id)).unwrap();
    },
    [dispatch],
  );

  return {
    ...locations,
    getLocation,
    fetchLocations,
    refetchLocations,
    createLocation,
    deleteLocation,
  };
};
