import { memo, useCallback, useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = TextInputProps & {
  formError?: string;
  isDisabled?: boolean;
};

export const Input = memo(
  ({ formError, isDisabled = false, onFocus, onBlur, ...rest }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const borderColor = useMemo(() => {
      if (formError) {
        return theme.colors.error;
      }

      if (isFocused) {
        return theme.colors.inputBorderInFocus;
      }

      return theme.colors.inputBorder;
    }, [
      formError,
      isFocused,
      theme.colors.inputBorder,
      theme.colors.error,
      theme.colors.inputBorderInFocus,
    ]);

    const handleFocusInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus],
    );

    const handleBlurInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur],
    );

    return (
      <S.Container>
        <S.Content hasFormError={!!formError} borderColor={borderColor}>
          <S.Input
            placeholderTextColor={theme.colors.placeholder}
            selectionColor={theme.colors.placeholder}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            autoCorrect={false}
            editable={!isDisabled}
            {...rest}
          />
        </S.Content>
        {!!formError && <S.FormError>{formError}</S.FormError>}
      </S.Container>
    );
  },
);
