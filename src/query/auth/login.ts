import { TAuth } from '@/domain/entities/Auth';

import { HttpServices } from '@/services/HttpServices';

export type LoginParams = {
  email: string;
  password: string;
};

export const login = async (params: LoginParams) => {
  const response = await HttpServices.get<TAuth>({
    url: '/login',
  });

  console.log(
    'We need use a POST request to login but for the mock api runs correctly i do a GET',
    params,
  );

  return response;
};
