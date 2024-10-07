import { memo } from 'react';

import * as Styled from './styles';

export const LocationSkeletonItem = memo(() => {
  return (
    <Styled.Container testID="location-skeleton-item">
      <Styled.Icon testID="skeleton-icon" />
      <Styled.Content>
        <Styled.Title testID="skeleton-title" />
        <Styled.Text testID="skeleton-text-1" />
        <Styled.Text testID="skeleton-text-2" />
      </Styled.Content>
    </Styled.Container>
  );
});
