import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { IconChevronLeft } from 'tabler-react-native/icons';

import * as Styled from './styles';

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
      <Styled.Container
        hasBackButton={hasBackButton}
        hasRightComponent={hasRightComponent}
      >
        {hasBackButton && (
          <Styled.GoBackButtonWrapper
            hasRightComponent={hasRightComponent}
            onPress={onBackButtonPress}
            testID="go-back-button"
          >
            <IconChevronLeft
              stroke={1.25}
              size={theme.iconSizes.md}
              color={theme.colors.textSecondary}
            />
          </Styled.GoBackButtonWrapper>
        )}
        {title && (
          <Styled.Title hasBackButton={hasBackButton}>{title}</Styled.Title>
        )}
        {rightComponent}
      </Styled.Container>
    );
  },
);
