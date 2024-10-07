import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { IconTrash } from 'tabler-react-native/icons';

import { useLocations } from '@/features/locations';

import { generateId } from '@/utils/generateId';

import { Header } from '@/components/elements/Header';

import * as Styled from './styles';

export const LocationDetails: React.FC = () => {
  const theme = useTheme();
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { id } = route.params as { id: number };
  const { getLocation, deleteLocation } = useLocations();
  const location = getLocation(id);
  const photoUri = location
    ? `https://openweathermap.org/img/wn/${location.iconCode}.png`
    : undefined;
  const kelvinSymbol = 'K';

  const info = useMemo(
    () => [
      {
        label: t('location.city_label'),
        value: location?.city,
      },
      {
        label: t('location.country_label'),
        value: location?.country,
      },
      {
        label: t('location.weather_condition_label'),
        value: location?.weatherCondition,
      },
      {
        label: t('location.description_label'),
        value: location?.description,
      },
      {
        label: t('location.temperature_label'),
        value: `${location?.temperature} ${kelvinSymbol}`,
      },
      {
        label: t('location.max_temp_label'),
        value: `${location?.maxTemp} ${kelvinSymbol}`,
      },
      {
        label: t('location.min_temp_label'),
        value: `${location?.minTemp} ${kelvinSymbol}`,
      },
      {
        label: t('location.humidity_label'),
        value: `${location?.humidity}%`,
      },
      {
        label: t('location.feels_like_label'),
        value: `${location?.feelsLike} ${kelvinSymbol}`,
      },
    ],
    [location, t],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDeleteLocation = useCallback(async () => {
    try {
      await deleteLocation(id);
      handleGoBack();
      toast.show(t('location.delete_location_success'), {
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      toast.show(t('location.delete_location_error'), {
        type: 'error',
        placement: 'top',
      });
    }
  }, [deleteLocation, handleGoBack, id, t, toast]);

  return (
    <Styled.Container
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: theme.layout[4],
      }}
    >
      <Header
        title={t('location.location_details_title')}
        onBackButtonPress={handleGoBack}
        rightComponent={
          <Styled.DeleteButton
            testID="delete-location-button"
            onPress={handleDeleteLocation}
            disabled={!location || location.isLoadingDelete}
          >
            {location?.isLoadingDelete ? (
              <ActivityIndicator color={theme.colors.textSecondary} />
            ) : (
              <IconTrash
                stroke={1.5}
                size={theme.iconSizes.md}
                color={theme.colors.textSecondary}
              />
            )}
          </Styled.DeleteButton>
        }
      />
      {!location || location.isLoadingDelete ? (
        <Styled.LoadingContainer>
          <ActivityIndicator color={theme.colors.textSecondary} />
        </Styled.LoadingContainer>
      ) : (
        <Styled.Content>
          <Styled.Icon source={{ uri: photoUri }} resizeMode="contain" />
          <Styled.InfoWrapper>
            {info.map(item => (
              <Styled.InfoContainer key={generateId()}>
                <Styled.InfoLabel>{item.label}:</Styled.InfoLabel>
                <Styled.InfoValue>{item.value}</Styled.InfoValue>
              </Styled.InfoContainer>
            ))}
          </Styled.InfoWrapper>
        </Styled.Content>
      )}
    </Styled.Container>
  );
};
