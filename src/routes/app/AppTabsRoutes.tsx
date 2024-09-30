import React from 'react';
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconHome, IconLogout } from 'tabler-react-native/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '@/features/auth';

import { LocationsStackRoutes } from './LocationsStackRoutes';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabsRoutes = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { logout, isLoadingLogout } = useAuth();

  const bottomSpace =
    Platform.OS === 'android' ? insets.bottom + theme.layout[4] : insets.bottom;

  return (
    <Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.main,
        tabBarStyle: {
          backgroundColor: theme.colors.bottomTabsBackgroundColor,
          borderTopColor: theme.colors.bottomTabsBorderColor,
          borderTopWidth: theme.border.width.md,
          height: bottomSpace + theme.layout[12],
          paddingTop: theme.layout[4],
          paddingBottom: bottomSpace + theme.layout[2],
        },
      }}
      initialRouteName="LocationsStackRoutes"
    >
      <Screen
        name="LocationsStackRoutes"
        component={LocationsStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <IconHome stroke={1.5} color={color} size={theme.iconSizes.md} />
          ),
        }}
      />
      <Screen
        name="Logout"
        component={React.Fragment}
        options={{
          tabBarIcon: ({ color }) => (
            <TouchableOpacity onPress={logout} disabled={isLoadingLogout}>
              {isLoadingLogout ? (
                <ActivityIndicator size="small" color={theme.colors.main} />
              ) : (
                <IconLogout
                  stroke={1.5}
                  color={color}
                  size={theme.iconSizes.md}
                />
              )}
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};
