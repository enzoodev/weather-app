import React from 'react';
import { t } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { useLocations } from '@/features/locations';
import { theme } from '@/theme';
import i18n from '@/lib/language/i18n';
import { Locations } from './index';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

jest.mock('@/features/locations', () => ({
  useLocations: jest.fn(),
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </NavigationContainer>
    </I18nextProvider>,
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

    expect(screen.getByText(t('location.title'))).toBeTruthy();
  });

  it('displays empty location message when there are no locations', () => {
    renderWithProviders(<Locations />);

    expect(screen.getByText(t('location.empty_location'))).toBeTruthy();
  });

  it('calls fetchLocations on mount', () => {
    renderWithProviders(<Locations />);

    expect(mockFetchLocations).toHaveBeenCalled();
  });
});
