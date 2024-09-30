import styled, { css } from 'styled-components/native';

type TContentTypeStyleProps = {
  hasFormError: boolean;
  borderColor: string;
};

export const Container = styled.View`
  border-radius: ${({ theme }) => theme.border.radius.md}px;
`;

export const Content = styled.View<TContentTypeStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${({ theme, hasFormError, borderColor }) => css`
    padding: ${theme.layout[3]}px ${theme.layout[4]}px;
    border-radius: ${theme.border.radius.md}px;
    border-width: ${theme.border.width.md}px;
    border-left-width: ${hasFormError
      ? theme.layout[1]
      : theme.border.width.md}px;
    border-color: ${borderColor};
  `};
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    width: 100%;
    padding: 0;
    border-width: 0;
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.md}px;
    color: ${theme.colors.textSecondary};
  `};
`;

export const FormError = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.main.regular};
    font-size: ${theme.fontSizes.sm}px;
    color: ${theme.colors.error};
    margin-top: ${theme.layout[2]}px;
  `};
`;
