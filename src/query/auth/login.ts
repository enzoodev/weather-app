import { TAuth } from '@/domain/entities/Auth';

import { HttpServices } from '@/services/HttpServices';

export type LoginParams = {
  email: string;
  password: string;
};

export const login = async (params: LoginParams) => {
  return HttpServices.post<TAuth>({
    url: '/login',
    body: params,
  });
};
