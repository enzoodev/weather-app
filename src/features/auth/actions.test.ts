import { login } from '@/query/auth/login';
import { loginAction, logoutAction } from './actions';

jest.mock('@/query/auth/login');

describe('Auth Actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockLoginData = { token: 'token' };
  const loginParams = { email: 'email', password: 'password' };

  describe('loginAction', () => {
    it('should dispatch login action and return the user data', async () => {
      (login as jest.Mock).mockResolvedValue(mockLoginData);

      const dispatch = jest.fn();
      const getState = jest.fn();

      const result = await loginAction(loginParams)(
        dispatch,
        getState,
        undefined,
      );

      expect(result.payload).toEqual(mockLoginData);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch logout action successfully', async () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();

      const result = await logoutAction()(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(mockDispatch).toHaveBeenCalled();
      expect(result.meta.requestStatus).toBe('fulfilled');
    });
  });
});
