import React, { useCallback, useEffect } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { IconMapOff, IconPlus } from 'tabler-react-native/icons';

import { useLocations } from '@/features/locations';

import { TLocation } from '@/domain/entities/Location';

import { Header } from '@/components/elements/Header';
import { LocationItem } from '@/components/modules/LocationItem';

import * as S from './styles';

export const Locations: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { data, isLoading, isRefetching, fetchLocations, refetchLocations } =
    useLocations();

  const handleOpenLocationDetails = useCallback(
    (id: number) => {
      navigation.navigate('LocationDetails', { id });
    },
    [navigation],
  );

  const loadingData = Array.from({ length: 6 }).map((_, index) => ({
    id: index,
  }));

  const flatListData = isLoading ? loadingData : data;

  const keyExtractor = useCallback((item: TLocation) => item.id.toString(), []);

  const renderItem: ListRenderItem<TLocation> = useCallback(
    ({ item }) => {
      if (isLoading) {
        return <ChecklistSkeletonItem />;
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
    <S.Container>
      <FlatList
        data={flatListData as []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.textSecondary}
            refreshing={isRefetching}
            onRefresh={refetchLocations}
          />
        }
        ListHeaderComponent={
          <Header
            title="Locais"
            rightComponent={
              <S.AddButton onPress={() => {}}>
                <IconPlus
                  stroke={1.5}
                  size={theme.iconSizes.lg}
                  color={theme.colors.mainContrast}
                />
              </S.AddButton>
            }
          />
        }
        ListEmptyComponent={
          <S.ListEmptyCard>
            <IconMapOff
              stroke={1.5}
              size={theme.iconSizes.xl}
              color={theme.colors.textSecondary}
            />
            <S.ListEmptyTitle>Nenhum local encontrado.</S.ListEmptyTitle>
          </S.ListEmptyCard>
        }
      />
    </S.Container>
  );
};
