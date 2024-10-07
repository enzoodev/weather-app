import React from 'react';
import { t } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { ThemeProvider } from 'styled-components/native';
import { useLocations } from '@/features/locations';
import { theme } from '@/theme';
import { filterCitiesByState } from '@/utils/filterCitiesByState';
import states from '@/mock/states.json';
import i18n from '@/lib/language/i18n';
import { CreateLocation } from './index';

const [firstState] = states;
const [firstCity] = filterCitiesByState(Number(firstState.value));

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

jest.mock('react-native-toast-notifications', () => ({
  useToast: jest.fn(),
}));

jest.mock('@/features/locations', () => ({
  useLocations: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    ...originalModule,
    useNavigation: jest.fn(),
    NavigationContainer: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

const mockCreateLocation = jest.fn();
const mockGoBack = jest.fn();
const mockToast = {
  show: jest.fn(),
};

const renderComponent = () => {
  (useLocations as jest.Mock).mockReturnValue({
    createLocation: mockCreateLocation,
    isLoadingRequest: false,
  });

  (useToast as jest.Mock).mockReturnValue(mockToast);

  (useNavigation as jest.Mock).mockReturnValue({
    goBack: mockGoBack,
  });

  return render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <CreateLocation />
        </NavigationContainer>
      </ThemeProvider>
    </I18nextProvider>,
  );
};

describe('CreateLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText(t('location.submit_button'))).toBeTruthy();
    expect(getByText(firstState.label)).toBeTruthy();
  });

  it('submits form successfully', async () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText(firstState.label));
    fireEvent.press(getByText(firstCity.label));

    fireEvent.press(getByText(t('location.submit_button')));

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
      expect(mockToast.show).toHaveBeenCalledWith(
        t('location.create_location_success'),
        {
          type: 'success',
          placement: 'top',
        },
      );
    });
  });

  it('handles error on submission', async () => {
    mockCreateLocation.mockImplementationOnce(() => {
      throw new Error('Error creating location');
    });

    const { getByText } = renderComponent();

    fireEvent.press(getByText(firstState.label));
    fireEvent.press(getByText(firstCity.label));

    fireEvent.press(getByText(t('location.submit_button')));

    await waitFor(() => {
      expect(mockToast.show).toHaveBeenCalledWith(
        t('location.create_location_error'),
        {
          type: 'error',
          placement: 'top',
        },
      );
    });
  });
});
