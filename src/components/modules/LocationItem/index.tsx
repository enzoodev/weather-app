import { memo } from 'react';

import { TLocation } from '@/domain/entities/Location';

import * as S from './styles';

type Props = {
  item: TLocation;
  onPress: () => void;
};

export const LocationItem = memo(({ item, onPress }: Props) => {
  return <S.Container />;
});
