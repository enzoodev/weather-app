import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { filterCitiesByState } from '@/utils/filterCitiesByState';

import { useLocations } from '@/features/locations';

import {
  createLocationSchema,
  TCreateLocationSchema,
} from '@/schemas/location/createLocationSchema';

import { Label } from '@/components/elements/Label';
import { Header } from '@/components/elements/Header';
import { Button } from '@/components/elements/Button';
import {
  SelectDropDown,
  SelectDropDownItem,
} from '@/components/elements/SelectDropDown';

import states from '@/mock/states.json';

import * as Styled from './styles';

export const CreateLocation: React.FC = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { createLocation, isLoadingRequest } = useLocations();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateLocationSchema>({
    resolver: yupResolver(createLocationSchema),
    defaultValues: {
      state: '',
      city: '',
    },
  });

  const state = watch('state');
  const city = watch('city');

  const handleSelectState = useCallback(
    (item: SelectDropDownItem) => {
      setValue('state', item.value);
    },
    [setValue],
  );

  const handleSelectCity = useCallback(
    (item: SelectDropDownItem) => {
      setValue('city', item.value);
    },
    [setValue],
  );

  const cityItems = useMemo(() => filterCitiesByState(Number(state)), [state]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit: SubmitHandler<TCreateLocationSchema> = useCallback(
    async data => {
      try {
        await createLocation({ city: data.city });
        handleGoBack();
        toast.show(t('location.create_location_success'), {
          type: 'success',
          placement: 'top',
        });
      } catch (error) {
        toast.show(t('location.create_location_error'), {
          type: 'error',
          placement: 'top',
        });
      }
    },
    [createLocation, handleGoBack, t, toast],
  );

  return (
    <Styled.Container>
      <Styled.Content>
        <Header
          title={t('location.create_location_title')}
          onBackButtonPress={handleGoBack}
        />
        <Label title={t('location.state_label')}>
          <SelectDropDown
            placeholder={t('location.state_label')}
            value={state}
            items={states}
            onSelectValue={handleSelectState}
            formError={errors.state?.message}
          />
        </Label>
        <Label
          title={t('location.city_label')}
          isDisabled={state.trim().length === 0}
        >
          <SelectDropDown
            placeholder={t('location.city_label')}
            value={city}
            items={cityItems}
            onSelectValue={handleSelectCity}
            formError={errors.city?.message}
          />
        </Label>
      </Styled.Content>
      <Button
        title={t('location.submit_button')}
        onPress={handleSubmit(onSubmit)}
        isLoading={isLoadingRequest}
      />
    </Styled.Container>
  );
};
