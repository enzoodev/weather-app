import { TLocation } from '@/domain/entities/Location';

import { HttpServices } from '@/services/HttpServices';

import { getWeather } from '../weather/getWeather';

export type CreateLocationParams = {
  city: string;
};

export const createLocation = async ({ city }: CreateLocationParams) => {
  const weather = await getWeather({ city });

  const response = await HttpServices.post<TLocation>({
    url: '/locations',
    body: {
      id: weather.id,
      city: weather.name,
      country: weather.sys.country,
      weatherCondition: weather.weather[0].main,
      description: weather.weather[0].description,
      temperature: weather.main.temp,
      maxTemp: weather.main.temp_max,
      minTemp: weather.main.temp_min,
      humidity: weather.main.humidity,
      feelsLike: weather.main.feels_like,
      iconCode: weather.weather[0].icon,
    } as TLocation,
  });

  return response;
};
