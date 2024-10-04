import { HttpServices } from '@/services/HttpServices';
import { TWeather } from '@/domain/entities/Weather';
import { getWeather } from './getWeather';

jest.mock('@/services/HttpServices');

describe('getWeather function', () => {
  const mockCity = 'London';
  const mockWeatherData = {
    main: {
      temp: 285.32,
      pressure: 1020,
      humidity: 60,
    },
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
      },
    ],
  } as TWeather;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch weather data for the specified city', async () => {
    (HttpServices.get as jest.Mock).mockResolvedValue(mockWeatherData);

    const result = await getWeather({ city: mockCity });

    expect(HttpServices.get).toHaveBeenCalledWith({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      hasBaseUrl: false,
      params: {
        q: mockCity,
        APPID: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      },
    });

    expect(result).toEqual(mockWeatherData);
  });

  it('should handle errors during weather data retrieval', async () => {
    const mockError = new Error('Weather API error');

    (HttpServices.get as jest.Mock).mockRejectedValue(mockError);

    await expect(getWeather({ city: mockCity })).rejects.toThrow(
      'Weather API error',
    );

    expect(HttpServices.get).toHaveBeenCalledWith({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      hasBaseUrl: false,
      params: {
        q: mockCity,
        APPID: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
      },
    });
  });
});
