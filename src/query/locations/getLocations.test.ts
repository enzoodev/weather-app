import { HttpServices } from '@/services/HttpServices';
import { TLocation } from '@/domain/entities/Location';
import { getLocations } from './getLocations';

jest.mock('@/services/HttpServices');

describe('getLocations function', () => {
  const mockLocations: TLocation[] = [
    {
      id: 1,
      city: 'New York',
      country: 'US',
      weatherCondition: 'Clear',
      description: 'clear sky',
      temperature: 25,
      maxTemp: 28,
      minTemp: 22,
      humidity: 60,
      feelsLike: 26,
      iconCode: '01d',
    },
    {
      id: 2,
      city: 'Los Angeles',
      country: 'US',
      weatherCondition: 'Clouds',
      description: 'few clouds',
      temperature: 22,
      maxTemp: 24,
      minTemp: 20,
      humidity: 70,
      feelsLike: 21,
      iconCode: '02d',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call HttpServices.get with the correct URL', async () => {
    (HttpServices.get as jest.Mock).mockResolvedValue(mockLocations);

    const result = await getLocations();

    expect(HttpServices.get).toHaveBeenCalledWith({
      url: '/locations',
    });
    expect(result).toEqual(mockLocations);
  });

  it('should handle errors when fetching locations', async () => {
    const mockError = new Error('Failed to fetch locations');

    (HttpServices.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getLocations()).rejects.toThrow('Failed to fetch locations');
    expect(HttpServices.get).toHaveBeenCalledWith({
      url: '/locations',
    });
  });
});
