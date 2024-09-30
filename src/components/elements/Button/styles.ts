import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type ButtonProps = {
  bgColor: string;
  borderColor: string;
  isDisabled: boolean;
};

type ButtonTextProps = {
  color: string;
};

export const Container = styled.TouchableHighlight<ButtonProps>`
  width: 100%;
  min-height: ${RFValue(42)}px;
  align-items: center;
  justify-content: center;
  ${({ theme, bgColor, borderColor, isDisabled }) => css`
    border-radius: ${theme.border.radius.md}px;
    background-color: ${bgColor};
    border: 1px solid ${borderColor};
    opacity: ${isDisabled ? 0.4 : 1};
  `};
`;

export const Content = styled.View`
  align-items: center;
  flex-direction: row;
  gap: ${({ theme }) => theme.layout[3]}px;
`;

export const Title = styled.Text<ButtonTextProps>`
  ${({ theme, color }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${theme.fontSizes.md}px;
    color: ${color};
  `};
`;
