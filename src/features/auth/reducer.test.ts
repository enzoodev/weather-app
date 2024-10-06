import { TAuth } from '@/domain/entities/Auth'; // Adjust the import path accordingly
import { authReducer } from './reducer'; // Adjust the import path accordingly
import { loginAction, logoutAction } from './actions';

describe('authReducer', () => {
  const initialState = {
    isLoadingLogin: false,
    isLoadingLogout: false,
    auth: null as TAuth | null,
  };

  const loginParamsMock = {
    email: 'email',
    password: 'password',
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle loginAction.pending', () => {
    const action = loginAction.pending('', loginParamsMock);
    const newState = authReducer(initialState, action);
    expect(newState.isLoadingLogin).toBe(true);
  });

  it('should handle loginAction.fulfilled', () => {
    const mockAuth = { token: 'test-token' } as TAuth;
    const action = loginAction.fulfilled(mockAuth, '', loginParamsMock);
    const newState = authReducer(initialState, action);
    expect(newState.auth).toEqual(mockAuth);
    expect(newState.isLoadingLogin).toBe(false);
  });

  it('should handle loginAction.rejected', () => {
    const action = loginAction.rejected(
      new Error('login failed'),
      '',
      loginParamsMock,
    );
    const newState = authReducer(initialState, action);
    expect(newState.isLoadingLogin).toBe(false);
  });

  it('should handle logoutAction.pending', () => {
    const action = logoutAction.pending('');
    const newState = authReducer(initialState, action);
    expect(newState.isLoadingLogout).toBe(true);
  });

  it('should handle logoutAction.fulfilled', () => {
    const initialStateWithAuth = {
      ...initialState,
      auth: { token: 'test-token' } as TAuth,
    };
    const action = logoutAction.fulfilled(undefined, '');
    const newState = authReducer(initialStateWithAuth, action);
    expect(newState.auth).toBeNull();
    expect(newState.isLoadingLogout).toBe(false);
  });

  it('should handle logoutAction.rejected', () => {
    const action = logoutAction.rejected(null, '');
    const newState = authReducer(initialState, action);
    expect(newState.isLoadingLogout).toBe(false);
  });
});
