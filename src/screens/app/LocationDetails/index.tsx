import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { IconTrash } from 'tabler-react-native/icons';

import { useLocations } from '@/features/locations';

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
            <Styled.InfoContainer>
              <Styled.InfoLabel>{t('location.city_label')}:</Styled.InfoLabel>
              <Styled.InfoValue>{location.city}</Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.country_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>{location.country}</Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.weather_condition_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>{location.weatherCondition}</Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.description_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>{location.description}</Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.temperature_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>
                {location.temperature} {kelvinSymbol}
              </Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.max_temp_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>
                {location.maxTemp} {kelvinSymbol}
              </Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.min_temp_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>
                {location.minTemp} {kelvinSymbol}
              </Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.humidity_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>{location.humidity}%</Styled.InfoValue>
            </Styled.InfoContainer>
            <Styled.InfoContainer>
              <Styled.InfoLabel>
                {t('location.feels_like_label')}:
              </Styled.InfoLabel>
              <Styled.InfoValue>
                {location.feelsLike} {kelvinSymbol}
              </Styled.InfoValue>
            </Styled.InfoContainer>
          </Styled.InfoWrapper>
        </Styled.Content>
      )}
    </Styled.Container>
  );
};
