import { TRequestConfig } from '@/domain/models/RequestConfig';

import { HttpMethod } from '@/enums/HttpMethod';

import { buildUrl } from '@/utils/buildUrl';
import { AppError } from '@/utils/error/AppError';
import { defaultErrorMessage } from '@/utils/error/defaultErrorMessage';

type RegisterInterceptTokenManager = {
  token?: string;
  logout?: () => void;
};

export class HttpServices {
  public static registerInterceptTokenManager: RegisterInterceptTokenManager =
    {};

  private static readonly baseUrl = 'http://localhost:3000/api/';

  private static request = async <T>({
    url,
    hasBaseUrl = true,
    method = HttpMethod.GET,
    body,
    params,
  }: TRequestConfig): Promise<T> => {
    try {
      const constructedUrl = buildUrl({
        baseUrl: hasBaseUrl ? this.baseUrl : undefined,
        url,
        params,
      });

      const response = await fetch(constructedUrl, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${this.registerInterceptTokenManager.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (
          response.status === 401 &&
          this.registerInterceptTokenManager.logout
        ) {
          this.registerInterceptTokenManager.logout();
        }

        const error = await response.json();
        throw new AppError(error.message ?? defaultErrorMessage);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error.message;
      }

      throw defaultErrorMessage;
    }
  };

  public static readonly get = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.GET, ...params });
  };

  public static readonly post = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.POST, ...params });
  };

  public static readonly put = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PUT, ...params });
  };

  public static readonly delete = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.DELETE, ...params });
  };

  public static readonly patch = async <T = unknown>(
    params: TRequestConfig,
  ): Promise<T> => {
    return this.request<T>({ method: HttpMethod.PATCH, ...params });
  };
}
