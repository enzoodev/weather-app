import React, { memo } from 'react';
import { ActivityIndicator, TouchableHighlightProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { darkenColor } from '@/utils/darkenColor';

import * as S from './styles';

type Props = TouchableHighlightProps & {
  title: string;
  onPress(): void;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export const Button = memo(
  ({
    title,
    color,
    bgColor,
    borderColor,
    onPress,
    isLoading = false,
    isDisabled = false,
    ...rest
  }: Props) => {
    const theme = useTheme();
    const buttonBgColor = bgColor ?? theme.colors.main;
    const buttonTextColor = color ?? theme.colors.mainContrast;

    return (
      <S.Container
        underlayColor={darkenColor(buttonBgColor, 0.2)}
        onPress={onPress}
        bgColor={buttonBgColor}
        borderColor={borderColor ?? buttonBgColor}
        disabled={isDisabled ?? isLoading}
        isDisabled={isDisabled}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator color={buttonTextColor} />
        ) : (
          <S.Content>
            <S.Title color={buttonTextColor}>{title}</S.Title>
          </S.Content>
        )}
      </S.Container>
    );
  },
);
