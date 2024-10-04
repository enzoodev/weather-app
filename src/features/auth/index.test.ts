import { renderHook, act } from '@testing-library/react-hooks';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAuth } from './index'; // Adjust the import path accordingly
import { loginAction, logoutAction } from './actions';

// Mock the hooks
jest.mock('@/hooks/useAppDispatch');
jest.mock('@/hooks/useAppSelector');

const mockedDispatch = jest.fn();
const mockedUseAppSelector = useAppSelector as jest.Mock;
const mockedUseAppDispatch = useAppDispatch as jest.Mock;

describe('useAuth', () => {
  beforeEach(() => {
    mockedUseAppDispatch.mockReturnValue(mockedDispatch);
  });

  it('should return the initial auth state', () => {
    mockedUseAppSelector.mockReturnValue({
      auth: null,
      isLoadingLogin: false,
      isLoadingLogout: false,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.auth).toBeNull();
    expect(result.current.isLoadingLogin).toBe(false);
    expect(result.current.isLoadingLogout).toBe(false);
  });
});
