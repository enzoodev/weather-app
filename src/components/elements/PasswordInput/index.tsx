import { memo, useCallback, useMemo, useState } from 'react';
import { TextInputProps, ViewProps, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { IconEye, IconEyeOff } from 'tabler-react-native/icons';

import * as S from './styles';

type Props = TextInputProps & {
  viewProps?: ViewProps;
  formError?: string;
};

export const PasswordInput = memo(
  ({ viewProps, formError, ...rest }: Props) => {
    const [isPasswordType, setIsPasswordType] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const handleToggleIsPasswordType = useCallback(() => {
      setIsPasswordType(prevState => !prevState);
    }, []);

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
      <S.Container {...viewProps}>
        <S.Content
          testID="input-wrapper-test"
          hasFormError={!!formError}
          borderColor={borderColor}
        >
          <S.Input
            autoCapitalize="none"
            placeholderTextColor={theme.colors.placeholder}
            selectionColor={theme.colors.placeholder}
            secureTextEntry={isPasswordType}
            autoCorrect={false}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            {...rest}
          />
          <TouchableOpacity onPress={handleToggleIsPasswordType}>
            {isPasswordType ? (
              <IconEye
                stroke={1.25}
                size={theme.iconSizes.sm}
                color={theme.colors.textSecondary}
              />
            ) : (
              <IconEyeOff
                stroke={1.25}
                size={theme.iconSizes.sm}
                color={theme.colors.textSecondary}
              />
            )}
          </TouchableOpacity>
        </S.Content>
        {!!formError && <S.FormError>{formError}</S.FormError>}
      </S.Container>
    );
  },
);
