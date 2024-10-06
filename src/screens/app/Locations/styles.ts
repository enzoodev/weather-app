import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
  `}
`;

export const AddButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    width: ${theme.layout[11]}px;
    height: ${theme.layout[11]}px;
    background-color: ${({ theme }) => theme.colors.main};
    border-radius: ${({ theme }) => theme.border.radius.full}px;
  `}
`;

export const ListEmptyCard = styled.View`
  ${({ theme }) => css`
    flex-direction: row;
    align-items: center;
    gap: ${theme.layout[4]}px;
    padding: ${theme.layout[4]}px;
    margin-top: ${theme.layout[4]}px;
    border-radius: ${theme.layout[2]}px;
    background-color: ${theme.colors.backgroundDark};
  `};
`;

export const ListEmptyTitle = styled.Text`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;
