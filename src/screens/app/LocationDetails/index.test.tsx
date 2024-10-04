import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useLocations } from '@/features/locations';
import { useToast } from 'react-native-toast-notifications';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { LocationDetails } from './index';

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    ...originalModule,
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
    NavigationContainer: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

jest.mock('react-native-toast-notifications', () => ({
  useToast: jest.fn(() => ({
    show: jest.fn(),
  })),
}));

jest.mock('@/features/locations', () => ({
  useLocations: jest.fn(),
}));

const renderComponent = () => {
  return render(
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <LocationDetails />
      </ThemeProvider>
    </NavigationContainer>,
  );
};

const mockLocation = {
  city: 'New York',
  country: 'USA',
  weatherCondition: 'Clear',
  description: 'Clear sky',
  temperature: 293,
  maxTemp: 298,
  minTemp: 290,
  humidity: 50,
  feelsLike: 295,
  iconCode: '01d',
  isLoadingDelete: false,
};

describe('LocationDetails', () => {
  const mockToast = {
    show: jest.fn(),
  };
  const mockGetLocation = jest.fn();
  const mockDeleteLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRoute as jest.Mock).mockReturnValue({
      params: { id: 1 },
    });

    (useNavigation as jest.Mock).mockReturnValue({
      goBack: jest.fn(),
    });

    (useToast as jest.Mock).mockReturnValue(mockToast);

    (useLocations as jest.Mock).mockReturnValue({
      getLocation: () => mockLocation,
      deleteLocation: mockDeleteLocation,
    });
  });

  it('renders location details correctly', () => {
    mockGetLocation.mockReturnValue(mockLocation);
    const { getByText } = renderComponent();

    expect(getByText(mockLocation.city)).toBeTruthy();
    expect(getByText(mockLocation.country)).toBeTruthy();
  });

  it('handles delete location', async () => {
    mockGetLocation.mockReturnValue(mockLocation);
    const { getByTestId } = renderComponent();

    const deleteButton = getByTestId('delete-location-button');

    fireEvent.press(deleteButton);

    await waitFor(() => {
      expect(mockDeleteLocation).toHaveBeenCalledWith(1);
      expect(mockToast.show).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          type: 'success',
          placement: 'top',
        }),
      );
    });
  });
});
