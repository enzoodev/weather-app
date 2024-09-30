/* eslint-disable global-require */
import React, { useCallback } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { Routes } from '@/routes';
import { theme } from '@/theme';
import { persistor, store } from '@/store';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [fontsLoaded, fontError] = Font.useFonts({
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('./src/assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ToastProvider offsetTop={RFValue(40)}>
              <Routes onReady={onLayoutRootView} />
            </ToastProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
