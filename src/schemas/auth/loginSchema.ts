import * as yup from 'yup';
import { t } from 'i18next';
import { authMock } from '@/mock/authMock';

const { email } = authMock.user;
const fakePassword = '123456';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(t('validation.email_valid'))
    .required(t('validation.email_required'))
    .oneOf([email], t('validation.email_must_be', { email })),
  password: yup
    .string()
    .required(t('validation.password_required'))
    .oneOf(
      [fakePassword],
      t('validation.password_must_be', { password: fakePassword }),
    ),
});

export type TLoginSchema = yup.InferType<typeof loginSchema>;
