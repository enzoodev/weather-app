import { HttpMethod } from '@/enums/HttpMethod';

export type TRequestConfig = {
  url: string;
  hasBaseUrl?: boolean;
  method?: HttpMethod;
  body?: Record<string, unknown>;
};
