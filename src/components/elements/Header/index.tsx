import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { IconChevronLeft } from 'tabler-react-native/icons';

import * as S from './styles';

type Props = {
  title: string;
  rightComponent?: React.ReactNode;
  onBackButtonPress?: () => void;
};

export const Header = memo(
  ({ title, rightComponent, onBackButtonPress }: Props) => {
    const theme = useTheme();
    const hasRightComponent = !!rightComponent;
    const hasBackButton = !!onBackButtonPress;

    return (
      <S.Container
        hasBackButton={hasBackButton}
        hasRightComponent={hasRightComponent}
      >
        {hasBackButton && (
          <S.GoBackButtonWrapper
            hasRightComponent={hasRightComponent}
            onPress={onBackButtonPress}
          >
            <IconChevronLeft
              stroke={1.25}
              size={theme.iconSizes.sm}
              color={theme.colors.textSecondary}
            />
          </S.GoBackButtonWrapper>
        )}
        {title && <S.Title hasBackButton={hasBackButton}>{title}</S.Title>}
        {rightComponent}
      </S.Container>
    );
  },
);
