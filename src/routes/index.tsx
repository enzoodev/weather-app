/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { useAuth } from '@/features/auth';

import { HttpServices } from '@/services/HttpServices';

import { AppStatusBar } from '@/components/elements/AppStatusBar';

import { AppRoutes } from './app/App.routes';
import { AuthRoutes } from './auth/Auth.routes';

type Props = {
  onReady: () => void;
};

export const Routes = ({ onReady }: Props) => {
  const theme = useTheme();
  const { auth, logout } = useAuth();
  const isLogged = !!auth?.user;

  DefaultTheme.colors.background = theme.colors.background;

  useEffect(() => {
    HttpServices.registerInterceptTokenManager.token = auth?.token;
    HttpServices.registerInterceptTokenManager.logout = logout;
  }, [auth]);

  return (
    <NavigationContainer onReady={onReady} theme={DefaultTheme}>
      <AppStatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
      {isLogged ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
