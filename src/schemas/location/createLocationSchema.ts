import * as yup from 'yup';
import { t } from 'i18next';

export const createLocationSchema = yup.object().shape({
  state: yup.string().required(t('validation.state_required')),
  city: yup.string().required(t('validation.city_required')),
});

export type TCreateLocationSchema = yup.InferType<typeof createLocationSchema>;
