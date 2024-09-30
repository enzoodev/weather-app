import { HttpServices } from '@/services/HttpServices';

export const deleteLocation = async (id: number) => {
  await HttpServices.delete({
    url: `/locations/${id}`,
  });
};
