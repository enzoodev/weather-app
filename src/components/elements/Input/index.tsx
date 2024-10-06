import { memo, useCallback, useMemo, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type Props = TextInputProps & {
  formError?: string;
  isDisabled?: boolean;
};

export const Input = memo(
  ({ formError, isDisabled = false, ...rest }: Props) => {
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

    const handleFocusInput = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlurInput = useCallback(() => {
      setIsFocused(false);
    }, []);

    return (
      <S.Container>
        <S.Content
          testID="input-wrapper-test"
          hasFormError={!!formError}
          borderColor={borderColor}
        >
          <S.Input
            testID="input-test"
            placeholderTextColor={theme.colors.placeholder}
            selectionColor={theme.colors.placeholder}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            editable={!isDisabled}
            {...rest}
          />
        </S.Content>
        {!!formError && <S.FormError>{formError}</S.FormError>}
      </S.Container>
    );
  },
);
