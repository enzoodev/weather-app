import { renderHook, act } from '@testing-library/react-hooks';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CreateLocationParams } from '@/query/locations/createLocation';
import {
  createLocationAction,
  deleteLocationAction,
  fetchLocationsAction,
} from './actions';
import { useLocations } from './index';

jest.mock('@/hooks/useAppDispatch');
jest.mock('@/hooks/useAppSelector');
jest.mock('./actions');

describe('useLocations', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({
      isLoading: false,
      isLoadingRequest: false,
      isRefetching: false,
      data: [
        { id: 1, name: 'Location 1' },
        { id: 2, name: 'Location 2' },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all locations and functions', () => {
    const { result } = renderHook(() => useLocations());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data.length).toBe(2);
    expect(result.current.getLocation).toBeDefined();
    expect(result.current.fetchLocations).toBeDefined();
    expect(result.current.createLocation).toBeDefined();
    expect(result.current.deleteLocation).toBeDefined();
  });

  it('should fetch locations', async () => {
    const { result } = renderHook(() => useLocations());

    (fetchLocationsAction as jest.Mock).mockReturnValue({
      unwrap: jest.fn().mockResolvedValueOnce(undefined),
    });

    await act(async () => {
      await result.current.fetchLocations();
    });

    expect(mockDispatch).toHaveBeenCalledWith(fetchLocationsAction());
  });

  it('should refetch locations', async () => {
    const { result } = renderHook(() => useLocations());

    (fetchLocationsAction as jest.Mock).mockReturnValue({
      unwrap: jest.fn().mockResolvedValueOnce(undefined),
    });

    await act(async () => {
      await result.current.refetchLocations();
    });

    expect(mockDispatch).toHaveBeenCalledWith(fetchLocationsAction());
  });

  it('should create a location', async () => {
    const { result } = renderHook(() => useLocations());
    const mockData: CreateLocationParams = { name: 'New Location' };

    (createLocationAction as jest.Mock).mockReturnValue({
      unwrap: jest.fn().mockResolvedValueOnce(undefined),
    });

    await act(async () => {
      await result.current.createLocation(mockData);
    });

    expect(mockDispatch).toHaveBeenCalledWith(createLocationAction(mockData));
  });

  it('should delete a location', async () => {
    const { result } = renderHook(() => useLocations());
    const locationId = 1;

    (deleteLocationAction as jest.Mock).mockReturnValue({
      unwrap: jest.fn().mockResolvedValueOnce(undefined),
    });

    await act(async () => {
      await result.current.deleteLocation(locationId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(deleteLocationAction(locationId));
  });

  it('should get a location by ID', () => {
    const { result } = renderHook(() => useLocations());

    const location = result.current.getLocation(1);
    expect(location).toEqual({ id: 1, name: 'Location 1' });
  });
});
