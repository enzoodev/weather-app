import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { IconTrash } from 'tabler-react-native/icons';

import { useLocations } from '@/features/locations';

import { Header } from '@/components/elements/Header';

import * as S from './styles';

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
    <S.Container
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: theme.layout[4],
      }}
    >
      <Header
        title={t('location.location_details_title')}
        onBackButtonPress={handleGoBack}
        rightComponent={
          <S.DeleteButton
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
          </S.DeleteButton>
        }
      />
      {!location || location.isLoadingDelete ? (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.textSecondary} />
        </S.LoadingContainer>
      ) : (
        <S.Content>
          <S.Icon source={{ uri: photoUri }} resizeMode="contain" />
          <S.InfoWrapper>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.city_label')}:</S.InfoLabel>
              <S.InfoValue>{location.city}</S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.country_label')}:</S.InfoLabel>
              <S.InfoValue>{location.country}</S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>
                {t('location.weather_condition_label')}:
              </S.InfoLabel>
              <S.InfoValue>{location.weatherCondition}</S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.description_label')}:</S.InfoLabel>
              <S.InfoValue>{location.description}</S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.temperature_label')}:</S.InfoLabel>
              <S.InfoValue>
                {location.temperature} {kelvinSymbol}
              </S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.max_temp_label')}:</S.InfoLabel>
              <S.InfoValue>
                {location.maxTemp} {kelvinSymbol}
              </S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.min_temp_label')}:</S.InfoLabel>
              <S.InfoValue>
                {location.minTemp} {kelvinSymbol}
              </S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.humidity_label')}:</S.InfoLabel>
              <S.InfoValue>{location.humidity}%</S.InfoValue>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.InfoLabel>{t('location.feels_like_label')}:</S.InfoLabel>
              <S.InfoValue>
                {location.feelsLike} {kelvinSymbol}
              </S.InfoValue>
            </S.InfoContainer>
          </S.InfoWrapper>
        </S.Content>
      )}
    </S.Container>
  );
};
