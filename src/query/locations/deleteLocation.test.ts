import { HttpServices } from '@/services/HttpServices';
import { deleteLocation } from './deleteLocation';

jest.mock('@/services/HttpServices');

describe('deleteLocation function', () => {
  const mockLocationId = 123;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call HttpServices.delete with the correct URL', async () => {
    (HttpServices.delete as jest.Mock).mockResolvedValue(undefined);

    await deleteLocation(mockLocationId);

    expect(HttpServices.delete).toHaveBeenCalledWith({
      url: `/locations/${mockLocationId}`,
    });
  });

  it('should handle errors when deleting a location', async () => {
    const mockError = new Error('Failed to delete location');

    (HttpServices.delete as jest.Mock).mockRejectedValue(mockError);

    await expect(deleteLocation(mockLocationId)).rejects.toThrow(
      'Failed to delete location',
    );

    expect(HttpServices.delete).toHaveBeenCalledWith({
      url: `/locations/${mockLocationId}`,
    });
  });
});
