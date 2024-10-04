import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { useLocations } from '@/features/locations';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { Locations } from './index';

jest.mock('@/features/locations', () => ({
  useLocations: jest.fn(),
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <NavigationContainer>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </NavigationContainer>,
  );
};

describe('Locations Component', () => {
  const mockFetchLocations = jest.fn();
  const mockRefetchLocations = jest.fn();

  beforeEach(() => {
    (useLocations as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isRefetching: false,
      fetchLocations: mockFetchLocations,
      refetchLocations: mockRefetchLocations,
    });
  });

  it('renders correctly', () => {
    renderWithProviders(<Locations />);

    expect(screen.getByText(/location.title/i)).toBeTruthy();
  });

  it('displays empty location message when there are no locations', () => {
    renderWithProviders(<Locations />);

    expect(screen.getByText(/location.empty_location/i)).toBeTruthy();
  });

  it('calls fetchLocations on mount', () => {
    renderWithProviders(<Locations />);

    expect(mockFetchLocations).toHaveBeenCalled();
  });
});
