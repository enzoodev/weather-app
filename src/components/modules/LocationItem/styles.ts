import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[3]}px;
    background-color: ${theme.colors.cardBackground};
    border: ${theme.border.width.md}px solid ${theme.colors.cardBorder};
    border-radius: ${theme.border.radius.md}px;
    margin-top: ${theme.layout[4]}px;
  `};
`;

export const Icon = styled.Image`
  ${({ theme }) => css`
    width: ${theme.iconSizes.xxxl}px;
    height: ${theme.iconSizes.xxxl}px;
    border-radius: ${theme.border.radius.full}px;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.semiBold};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const ContentWrapper = styled.View`
  flex-direction: row;
  ${({ theme }) => css`
    gap: ${theme.layout[3]}px;
  `};
`;

export const Content = styled.View`
  ${({ theme }) => css`
    gap: ${theme.layout[2]}px;
  `};
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => css`
    gap: ${theme.layout[12]}px;
  `};
`;

export const InfoContainerRow = styled.View`
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
