import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  ${({ theme }) => css`
    padding: ${theme.layout[4]}px;
    background-color: ${theme.colors.background};
  `}
`;

export const Content = styled.View`
  flex: 1;
  ${({ theme }) => css`
    gap: ${theme.layout[4]}px;
  `}
`;
