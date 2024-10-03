import * as yup from 'yup';
import { t } from 'i18next';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(t('validation.email_valid'))
    .required(t('validation.email_required')),
  password: yup.string().required(t('validation.password_required')),
});

export type TLoginSchema = yup.InferType<typeof loginSchema>;
