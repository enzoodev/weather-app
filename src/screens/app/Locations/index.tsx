import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { IconMapOff, IconPlus } from 'tabler-react-native/icons';

import { useLocations } from '@/features/locations';

import { TLocation } from '@/domain/entities/Location';

import { Header } from '@/components/elements/Header';
import { LocationItem } from '@/components/modules/LocationItem';
import { LocationSkeletonItem } from '@/components/modules/LocationSkeletonItem';

import * as Styled from './styles';

export const Locations: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { data, isLoading, isRefetching, fetchLocations, refetchLocations } =
    useLocations();
  const { t } = useTranslation();
  const hasMaximunLocations = data?.length === 3;

  const handleCreateLocation = useCallback(() => {
    navigation.navigate('CreateLocation');
  }, [navigation]);

  const handleOpenLocationDetails = useCallback(
    (id: number) => {
      navigation.navigate('LocationDetails', { id });
    },
    [navigation],
  );

  const loadingData = Array.from({ length: 3 }).map((_, index) => ({
    id: index,
  }));

  const flatListData = isLoading ? loadingData : data;

  const keyExtractor = useCallback((item: TLocation) => item.id.toString(), []);

  const renderItem: ListRenderItem<TLocation> = useCallback(
    ({ item }) => {
      if (isLoading) {
        return <LocationSkeletonItem />;
      }

      return (
        <LocationItem
          item={item}
          onPress={() => handleOpenLocationDetails(item.id)}
        />
      );
    },
    [handleOpenLocationDetails, isLoading],
  );

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return (
    <Styled.Container>
      <FlatList
        data={flatListData as []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: theme.layout[4] }}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.textSecondary}
            refreshing={isRefetching}
            onRefresh={refetchLocations}
          />
        }
        ListHeaderComponent={
          <Header
            title={t('location.title')}
            rightComponent={
              !hasMaximunLocations && (
                <Styled.AddButton onPress={handleCreateLocation}>
                  <IconPlus
                    stroke={1.5}
                    size={theme.iconSizes.lg}
                    color={theme.colors.mainContrast}
                  />
                </Styled.AddButton>
              )
            }
          />
        }
        ListEmptyComponent={
          <Styled.ListEmptyCard>
            <IconMapOff
              stroke={1.5}
              size={theme.iconSizes.xl}
              color={theme.colors.textSecondary}
            />
            <Styled.ListEmptyTitle>
              {t('location.empty_location')}
            </Styled.ListEmptyTitle>
          </Styled.ListEmptyCard>
        }
      />
    </Styled.Container>
  );
};
