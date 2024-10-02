import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useCreateLocationSchema = () => {
  const { t } = useTranslation();

  const createLocationSchema = yup.object().shape({
    state: yup.string().required(t('validation.state_required')),
    city: yup.string().required(t('validation.city_required')),
  });

  return createLocationSchema;
};

export type TCreateLocationSchema = yup.InferType<
  ReturnType<typeof useCreateLocationSchema>
>;
