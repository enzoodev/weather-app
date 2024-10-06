import { HttpServices } from '@/services/HttpServices';
import { TLocation } from '@/domain/entities/Location';
import { createLocation } from './createLocation';
import { getWeather } from '../weather/getWeather';

jest.mock('@/services/HttpServices');
jest.mock('../weather/getWeather');

describe('createLocation function', () => {
  const mockCity = 'London';
  const mockWeatherData = {
    id: 123456,
    name: mockCity,
    sys: { country: 'GB' },
    weather: [
      {
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
      },
    ],
    main: {
      temp: 285.32,
      temp_max: 286.15,
      temp_min: 284.55,
      humidity: 60,
      feels_like: 284.32,
    },
  };

  const mockResponse: TLocation = {
    id: mockWeatherData.id,
    city: mockWeatherData.name,
    country: mockWeatherData.sys.country,
    weatherCondition: mockWeatherData.weather[0].main,
    description: mockWeatherData.weather[0].description,
    temperature: mockWeatherData.main.temp,
    maxTemp: mockWeatherData.main.temp_max,
    minTemp: mockWeatherData.main.temp_min,
    humidity: mockWeatherData.main.humidity,
    feelsLike: mockWeatherData.main.feels_like,
    iconCode: mockWeatherData.weather[0].icon,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a location with weather data', async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    (HttpServices.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createLocation({ city: mockCity });

    expect(getWeather).toHaveBeenCalledWith({ city: mockCity });

    expect(HttpServices.post).toHaveBeenCalledWith({
      url: '/locations',
      body: mockResponse,
    });

    expect(result).toEqual(mockResponse);
  });

  it('should handle errors when fetching weather data', async () => {
    const mockError = new Error('Weather API error');

    (getWeather as jest.Mock).mockRejectedValue(mockError);

    await expect(createLocation({ city: mockCity })).rejects.toThrow(
      'Weather API error',
    );

    expect(HttpServices.post).not.toHaveBeenCalled();
  });

  it('should handle errors when creating a location', async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    const mockError = new Error('Failed to create location');

    (HttpServices.post as jest.Mock).mockRejectedValue(mockError);

    await expect(createLocation({ city: mockCity })).rejects.toThrow(
      'Failed to create location',
    );

    expect(getWeather).toHaveBeenCalledWith({ city: mockCity });
  });
});
