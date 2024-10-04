import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { Skeleton } from './index';

describe('<Skeleton />', () => {
  it('should have animated opacity', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Skeleton testID="skeleton" />
      </ThemeProvider>,
    );
    const skeletonComponent = getByTestId('skeleton');

    expect(skeletonComponent).toBeTruthy();
    expect(skeletonComponent.props.style).toHaveProperty('opacity');
  });
});
