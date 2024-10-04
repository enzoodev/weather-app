import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import { IconChevronRight } from 'tabler-react-native/icons';

import { TLocation } from '@/domain/entities/Location';

import * as S from './styles';

type Props = {
  item: TLocation;
  onPress: () => void;
};

export const LocationItem = memo(({ item, onPress }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const photoUri = `https://openweathermap.org/img/wn/${item.iconCode}.png`;
  const kelvinSymbol = 'K';

  return (
    <S.Container onPress={onPress}>
      <S.ContentWrapper>
        <S.Icon source={{ uri: photoUri }} resizeMode="contain" />
        <S.Content>
          <S.Title>{item.city}</S.Title>
          <S.InfoContainer>
            <S.InfoContainerRow>
              <S.InfoLabel>{t('location.description')}:</S.InfoLabel>
              <S.InfoValue>{item.description}</S.InfoValue>
            </S.InfoContainerRow>
            <S.InfoContainerRow>
              <S.InfoLabel>{t('location.temperature')}:</S.InfoLabel>
              <S.InfoValue>
                {item.temperature} {kelvinSymbol}
              </S.InfoValue>
            </S.InfoContainerRow>
          </S.InfoContainer>
        </S.Content>
      </S.ContentWrapper>
      <IconChevronRight
        stroke={1.5}
        size={theme.iconSizes.md}
        color={theme.colors.textSecondary}
      />
    </S.Container>
  );
});
