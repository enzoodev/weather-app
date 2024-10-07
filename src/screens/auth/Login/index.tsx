import { useCallback } from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';
import { useTheme } from 'styled-components/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/features/auth';

import { loginSchema, TLoginSchema } from '@/schemas/auth/loginSchema';

import Logo from '@/assets/images/turno-tm.png';

import { Label } from '@/components/elements/Label';
import { Input } from '@/components/elements/Input';
import { Button } from '@/components/elements/Button';
import { PasswordInput } from '@/components/elements/PasswordInput';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';

import * as Styled from './styles';

export const Login = () => {
  const theme = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const { login, isLoadingLogin } = useAuth();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<TLoginSchema> = useCallback(
    async data => {
      try {
        await login(data);
      } catch (error) {
        toast.show(t('login.login_error'), {
          type: 'danger',
          placement: 'top',
        });
      }
    },
    [login, t, toast],
  );

  return (
    <Styled.Container>
      <ScrollView
        contentContainerStyle={{
          paddingTop: dimensions.height * 0.15,
          paddingBottom: insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <Styled.Content>
            <Image
              source={Logo}
              style={{
                height: theme.layout[12],
                width: theme.layout[40],
              }}
            />
            <Styled.FormWrapper>
              <Styled.Label>{t('login.access_account')}</Styled.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Label title={t('login.email')}>
                    <Input
                      value={value}
                      onChangeText={onChange}
                      formError={errors.email?.message}
                      keyboardType="email-address"
                      placeholder={t('login.email')}
                      autoCapitalize="none"
                    />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Label title={t('login.password')}>
                    <PasswordInput
                      value={value}
                      onChangeText={onChange}
                      placeholder={t('login.password')}
                      formError={errors.password?.message}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  </Label>
                )}
              />
            </Styled.FormWrapper>
            <Button
              title={t('login.enter')}
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoadingLogin}
            />
          </Styled.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </Styled.Container>
  );
};
