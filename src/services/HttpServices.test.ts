import { HttpServices } from '@/services/HttpServices';
import { HttpMethod } from '@/enums/HttpMethod';
import { TRequestConfig } from '@/domain/models/RequestConfig';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('HttpServices', () => {
  const token = 'mocked_token';
  const logout = jest.fn();

  beforeEach(() => {
    HttpServices.registerInterceptTokenManager = {
      token,
      logout,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseUrl = 'http://localhost:3333/';
  const mockUrl = 'test-url';

  it('should make a GET request and return data', async () => {
    const mockResponse = { data: 'test_data' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const params: TRequestConfig = { url: mockUrl };
    const data = await HttpServices.get(params);

    expect(mockFetch).toHaveBeenCalledWith(
      `${baseUrl}${mockUrl}`,
      expect.objectContaining({
        method: HttpMethod.GET,
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      }),
    );
    expect(data).toEqual(mockResponse);
  });

  it('should make a POST request and return data', async () => {
    const mockResponse = { data: 'post_data' };
    const mockBody = { name: 'test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const params: TRequestConfig = {
      url: mockUrl,
      method: HttpMethod.POST,
      body: mockBody,
    };
    const data = await HttpServices.post(params);

    expect(mockFetch).toHaveBeenCalledWith(
      `${baseUrl}${mockUrl}`,
      expect.objectContaining({
        method: HttpMethod.POST,
        body: JSON.stringify(mockBody),
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      }),
    );
    expect(data).toEqual(mockResponse);
  });

  it('should handle 401 error and call logout', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    const params: TRequestConfig = { url: mockUrl };

    await expect(HttpServices.get(params)).rejects.toThrow('Unauthorized');

    expect(logout).toHaveBeenCalled();
  });

  it('should throw an error when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Bad Request' }),
    });

    const params: TRequestConfig = { url: mockUrl };

    await expect(HttpServices.get(params)).rejects.toThrow('Bad Request');
  });

  it('should make a PUT request', async () => {
    const mockResponse = { data: 'put_data' };
    const mockBody = { name: 'test_put' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const myCustomBaseUrl = 'http://localhost:3000/';
    const params: TRequestConfig = {
      url: `${myCustomBaseUrl}${mockUrl}`,
      method: HttpMethod.PUT,
      body: mockBody,
      hasBaseUrl: false,
    };
    const data = await HttpServices.put(params);

    expect(mockFetch).toHaveBeenCalledWith(
      `${myCustomBaseUrl}${mockUrl}`,
      expect.objectContaining({
        method: HttpMethod.PUT,
        body: JSON.stringify(mockBody),
      }),
    );
    expect(data).toEqual(mockResponse);
  });

  it('should make a DELETE request', async () => {
    const mockResponse = { message: 'Deleted' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const params: TRequestConfig = { url: mockUrl };

    const data = await HttpServices.delete(params);

    expect(mockFetch).toHaveBeenCalledWith(
      `${baseUrl}${mockUrl}`,
      expect.objectContaining({
        method: HttpMethod.DELETE,
      }),
    );
    expect(data).toEqual(mockResponse);
  });

  it('should make a PATCH request', async () => {
    const mockResponse = { data: 'patch_data' };
    const mockBody = { name: 'test_patch' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const params: TRequestConfig = {
      url: mockUrl,
      method: HttpMethod.PATCH,
      body: mockBody,
    };
    const data = await HttpServices.patch(params);

    expect(mockFetch).toHaveBeenCalledWith(
      `${baseUrl}${mockUrl}`,
      expect.objectContaining({
        method: HttpMethod.PATCH,
        body: JSON.stringify(mockBody),
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      }),
    );
    expect(data).toEqual(mockResponse);
  });
});
