import { useCallback } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { LoginParams } from '@/query/auth/login';

import { loginAction, logoutAction } from './actions';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const login = useCallback(
    async (data: LoginParams) => {
      await dispatch(loginAction(data)).unwrap();
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    await dispatch(logoutAction()).unwrap();
  }, [dispatch]);

  return {
    ...auth,
    login,
    logout,
  };
};
