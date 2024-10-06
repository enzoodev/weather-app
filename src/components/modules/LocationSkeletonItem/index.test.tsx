import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { LocationSkeletonItem } from './index';

describe('<LocationSkeletonItem />', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('should render correctly', () => {
    const { getByTestId } = renderWithTheme(<LocationSkeletonItem />);

    const container = getByTestId('location-skeleton-item');
    expect(container).toBeTruthy();

    const icon = getByTestId('skeleton-icon');
    expect(icon).toBeTruthy();

    const title = getByTestId('skeleton-title');
    expect(title).toBeTruthy();

    const textElement1 = getByTestId('skeleton-text-1');
    expect(textElement1).toBeTruthy();

    const textElement2 = getByTestId('skeleton-text-2');
    expect(textElement2).toBeTruthy();
  });
});
