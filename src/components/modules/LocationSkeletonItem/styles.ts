import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Skeleton } from '@/components/elements/Skeleton';

export const Container = styled.View`
  flex-direction: row;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
    padding: ${theme.layout[3]}px;
    background-color: ${theme.colors.cardBackground};
    border: ${theme.border.width.md}px solid ${theme.colors.cardBorder};
    border-radius: ${theme.border.radius.md}px;
    margin-top: ${theme.layout[4]}px;
  `};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const Icon = styled(Skeleton)`
  ${({ theme }) => css`
    width: ${theme.iconSizes.xxxl}px;
    height: ${theme.iconSizes.xxxl}px;
    border-radius: ${theme.border.radius.full}px;
  `}
`;

export const Title = styled(Skeleton)`
  width: ${RFValue(150)}px;
  height: ${RFValue(13)}px;
`;

export const Text = styled(Skeleton)`
  width: ${RFValue(120)}px;
  height: ${RFValue(11)}px;
`;
