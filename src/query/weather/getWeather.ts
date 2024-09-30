import { TWeather } from '@/domain/entities/Weather';

import { HttpServices } from '@/services/HttpServices';

type GetWeatherParams = {
  city: string;
};

export const getWeather = async ({ city }: GetWeatherParams) => {
  return HttpServices.get<TWeather>({
    url: 'https://api.openweathermap.org/data/2.5/weather',
    hasBaseUrl: false,
    params: {
      q: city,
      APPID: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    },
  });
};
