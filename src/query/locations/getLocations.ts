import { TLocation } from '@/domain/entities/Location';

import { HttpServices } from '@/services/HttpServices';

export const getLocations = async () => {
  return HttpServices.get<TLocation[]>({
    url: '/locations',
  });
};
