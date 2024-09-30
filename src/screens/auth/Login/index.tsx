import { useCallback } from 'react';
import { Image, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from 'react-native-toast-notifications';
import { useTheme } from 'styled-components/native';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '@/features/auth';

import { loginSchema, TLoginSchema } from '@/schemas/auth/loginSchema';

import Logo from '@/assets/images/turno-tm.png';

import { Label } from '@/components/elements/Label';
import { Input } from '@/components/elements/Input';
import { Button } from '@/components/elements/Button';
import { PasswordInput } from '@/components/elements/PasswordInput';
import { AnimatedKeyboardWrapper } from '@/components/elements/AnimatedKeyboardWrapper';

import * as S from './styles';

export const Login = () => {
  const theme = useTheme();
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const { login, isLoadingLogin } = useAuth();

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
        toast.show('Não foi possível entrar na sua conta.', {
          type: 'danger',
          placement: 'top',
        });
      }
    },
    [login, toast],
  );

  return (
    <S.Container>
      <ScrollView
        contentContainerStyle={{
          paddingTop: dimensions.height * 0.15,
          paddingBottom: insets.bottom,
        }}
      >
        <AnimatedKeyboardWrapper>
          <S.Content>
            <Image
              source={Logo}
              style={{
                height: theme.layout[12],
                width: theme.layout[40],
              }}
            />
            <S.FormWrapper>
              <S.Label>Acesse sua conta</S.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Label title="Email">
                    <Input
                      value={value}
                      onChangeText={onChange}
                      formError={errors.email?.message}
                      keyboardType="email-address"
                      placeholder="Email"
                      autoCapitalize="none"
                    />
                  </Label>
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Label title="Senha">
                    <PasswordInput
                      value={value}
                      onChangeText={onChange}
                      placeholder="Senha"
                      formError={errors.password?.message}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  </Label>
                )}
              />
            </S.FormWrapper>
            <Button
              title="Entrar"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoadingLogin}
            />
          </S.Content>
        </AnimatedKeyboardWrapper>
      </ScrollView>
    </S.Container>
  );
};
