import { TAuth } from '@/domain/entities/Auth';

export const authMock: TAuth = {
  user: {
    name: 'testuser',
    email: 'enzo@turno.com',
    photo: 'https://github.com/enzoodev.png',
  },
  token: 'fake-jwt-token',
};
