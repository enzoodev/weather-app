import { TRequestConfig } from '@/domain/models/RequestConfig';

import { HttpMethod } from '@/enums/HttpMethod';
import { buildUrl } from '@/utils/buildUrl';

type RegisterInterceptTokenManager = {
  token?: string;
  logout?: () => void;
};

export class HttpServices {
  public static registerInterceptTokenManager: RegisterInterceptTokenManager =
    {};

  private static readonly address =
    process.env.EXPO_PUBLIC_PRIVATE_IP ?? 'localhost';

  private static readonly port = process.env.EXPO_PUBLIC_PORT ?? '3333';

  private static readonly baseUrl = `http://${this.address}:${this.port}/`;

  private static request = async <T>({
    url,
    hasBaseUrl = true,
    method = HttpMethod.GET,
    body,
    params,
  }: TRequestConfig): Promise<T> => {
    const fullUrl = buildUrl({
      baseUrl: hasBaseUrl ? this.baseUrl : undefined,
      url,
      params,
    });

    const response = await fetch(fullUrl, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.registerInterceptTokenManager.token}`,
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
      throw new Error(error.message);
    }

    const data: T = await response.json();
    return data;
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
