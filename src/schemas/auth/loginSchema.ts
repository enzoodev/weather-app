import * as yup from 'yup';
import { authMock } from '@/mock/authMock';

const { email } = authMock.user;
const fakePassword = '123456';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email válido')
    .required('O email é obrigatório')
    .oneOf([email], `O email deve ser ${email}`),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .oneOf([fakePassword], `A senha deve ser ${fakePassword}`),
});

export type TLoginSchema = yup.InferType<typeof loginSchema>;
