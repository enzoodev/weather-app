import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

const { height } = Dimensions.get('window');

export const Container = styled.ScrollView`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
  `}
`;

export const LoadingContainer = styled.View`
  margin-top: ${height / 3}px;
`;

export const Content = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    margin-top: ${theme.layout[4]}px;
  `}
`;

export const InfoWrapper = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `}
`;

export const DeleteButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    width: ${theme.layout[11]}px;
    height: ${theme.layout[11]}px;
    background-color: ${({ theme }) => theme.colors.backgroundDark};
    border-radius: ${({ theme }) => theme.border.radius.full}px;
  `}
`;

export const Icon = styled.Image`
  align-self: center;
  ${({ theme }) => css`
    width: ${theme.layout[32]}px;
    height: ${theme.layout[32]}px;
    border-radius: ${theme.border.radius.full}px;
    background-color: ${theme.colors.main};
  `}
`;

export const InfoContainer = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[1]}px;
  `};
`;

export const InfoLabel = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;

export const InfoValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.textTertiary};
  `};
`;
