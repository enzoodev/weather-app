import { HttpServices } from '@/services/HttpServices';
import { TAuth } from '@/domain/entities/Auth';
import { login, LoginParams } from './login';

jest.mock('@/services/HttpServices');

describe('login function', () => {
  const mockLoginParams: LoginParams = {
    email: 'test@example.com',
    password: 'password',
  };
  const mockAuthData: TAuth = { token: 'mockToken' } as TAuth;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should perform a login and return user data', async () => {
    (HttpServices.get as jest.Mock).mockResolvedValue(mockAuthData);

    const result = await login(mockLoginParams);

    expect(HttpServices.get).toHaveBeenCalledWith({ url: '/login' });
    expect(result).toEqual(mockAuthData);
  });

  it('should handle errors during login', async () => {
    const mockError = new Error('Login failed');

    (HttpServices.get as jest.Mock).mockRejectedValue(mockError);
    await expect(login(mockLoginParams)).rejects.toThrow('Login failed');
    expect(HttpServices.get).toHaveBeenCalledWith({ url: '/login' });
  });
});
