export type TLocation = {
  id: number;
  city: string;
  country: string;
  weatherCondition: string;
  description: string;
  temperature: number;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  feelsLike: number;
  isLoadingDelete?: boolean;
};
