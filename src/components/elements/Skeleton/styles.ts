import styled, { css } from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)`
  ${({ theme }) => css`
    border-radius: ${theme.layout[2]}px;
    background-color: ${theme.colors.skeleton};
  `};
`;
