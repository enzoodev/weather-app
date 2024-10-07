import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import { IconChevronRight } from 'tabler-react-native/icons';

import { TLocation } from '@/domain/entities/Location';

import * as Styled from './styles';

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
    <Styled.Container testID="location-item" onPress={onPress}>
      <Styled.ContentWrapper>
        <Styled.Icon source={{ uri: photoUri }} resizeMode="contain" />
        <Styled.Content>
          <Styled.Title>{item.city}</Styled.Title>
          <Styled.InfoContainer>
            <Styled.InfoContainerRow>
              <Styled.InfoLabel>{t('location.description')}:</Styled.InfoLabel>
              <Styled.InfoValue>{item.description}</Styled.InfoValue>
            </Styled.InfoContainerRow>
            <Styled.InfoContainerRow>
              <Styled.InfoLabel>{t('location.temperature')}:</Styled.InfoLabel>
              <Styled.InfoValue>
                {item.temperature} {kelvinSymbol}
              </Styled.InfoValue>
            </Styled.InfoContainerRow>
          </Styled.InfoContainer>
        </Styled.Content>
      </Styled.ContentWrapper>
      <IconChevronRight
        stroke={1.5}
        size={theme.iconSizes.md}
        color={theme.colors.textSecondary}
      />
    </Styled.Container>
  );
});
