import { TLocation } from '@/domain/entities/Location';
import { locationsReducer } from './reducer';
import {
  createLocationAction,
  deleteLocationAction,
  fetchLocationsAction,
  refetchLocationsAction,
} from './actions';

describe('locationsReducer', () => {
  const initialState = {
    isLoading: true,
    isLoadingRequest: false,
    isRefetching: false,
    data: [] as TLocation[],
  };

  it('should return the initial state', () => {
    expect(locationsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchLocationsAction.pending', () => {
    const action = fetchLocationsAction.pending('');
    const newState = locationsReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle fetchLocationsAction.fulfilled', () => {
    const mockLocations = [{ id: 1 }, { id: 2 }] as TLocation[];
    const action = fetchLocationsAction.fulfilled(mockLocations, '');
    const newState = locationsReducer(initialState, action);
    expect(newState.data).toEqual(mockLocations);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle fetchLocationsAction.rejected', () => {
    const action = fetchLocationsAction.rejected(null, '');
    const newState = locationsReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle refetchLocationsAction.pending', () => {
    const action = refetchLocationsAction.pending('');
    const newState = locationsReducer(initialState, action);
    expect(newState.isRefetching).toBe(true);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle refetchLocationsAction.fulfilled', () => {
    const mockLocations = [{ id: 1 }, { id: 2 }] as TLocation[];
    const action = refetchLocationsAction.fulfilled(mockLocations, '');
    const newState = locationsReducer(initialState, action);
    expect(newState.data).toEqual(mockLocations);
    expect(newState.isRefetching).toBe(false);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle refetchLocationsAction.rejected', () => {
    const action = refetchLocationsAction.rejected(null, '');
    const newState = locationsReducer(initialState, action);
    expect(newState.isRefetching).toBe(false);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle createLocationAction.pending', () => {
    const action = createLocationAction.pending('', { city: 'city' });
    const newState = locationsReducer(initialState, action);
    expect(newState.isLoadingRequest).toBe(true);
  });

  it('should handle createLocationAction.fulfilled', () => {
    const mockLocation = { id: 1 } as TLocation;
    const action = createLocationAction.fulfilled(mockLocation, 'requestId', {
      city: 'city',
    });
    const newState = locationsReducer(initialState, action);
    expect(newState.data).toContainEqual(mockLocation);
    expect(newState.isLoadingRequest).toBe(false);
  });

  it('should handle createLocationAction.rejected', () => {
    const action = createLocationAction.rejected(
      new Error('Delete failed'),
      'requestId',
      { city: 'city' },
    );
    const newState = locationsReducer(initialState, action);
    expect(newState.isLoadingRequest).toBe(false);
  });

  it('should handle deleteLocationAction.pending', () => {
    const initialStateWithData = {
      ...initialState,
      data: [{ id: 1 }] as Array<TLocation>,
    };
    const action = deleteLocationAction.pending('', 1);
    const newState = locationsReducer(initialStateWithData, action);
    expect(newState.data[0].isLoadingDelete).toBe(true);
  });

  it('should handle deleteLocationAction.fulfilled', () => {
    const initialStateWithData = {
      ...initialState,
      data: [{ id: 1 }] as Array<TLocation>,
    };
    const action = deleteLocationAction.fulfilled(undefined, 'requestId', 1);
    const newState = locationsReducer(initialStateWithData, action);
    expect(newState.data).toEqual([]);
  });

  it('should handle deleteLocationAction.rejected', () => {
    const initialStateWithData = {
      ...initialState,
      data: [{ id: 1, isLoadingDelete: true }] as Array<TLocation>,
    };
    const action = deleteLocationAction.rejected(
      new Error('Delete failed'),
      'requestId',
      1,
    );
    const newState = locationsReducer(initialStateWithData, action);
    expect(newState.data[0].isLoadingDelete).toBe(false);
  });
});
