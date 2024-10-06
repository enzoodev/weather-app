import { memo } from 'react';

import * as S from './styles';

export const LocationSkeletonItem = memo(() => {
  return (
    <S.Container testID="location-skeleton-item">
      <S.Icon testID="skeleton-icon" />
      <S.Content>
        <S.Title testID="skeleton-title" />
        <S.Text testID="skeleton-text-1" />
        <S.Text testID="skeleton-text-2" />
      </S.Content>
    </S.Container>
  );
});
