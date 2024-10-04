import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useLocations } from '@/features/locations';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { NavigationContainer } from '@react-navigation/native';
import { CreateLocation } from './index';

// Mocking useToast and useLocations
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

// Mock states and cities data
const mockStates = [
  { id: 1, name: 'State 1' },
  { id: 2, name: 'State 2' },
];

const mockCities = [
  { id: 1, name: 'City 1', state_id: 1 },
  { id: 2, name: 'City 2', state_id: 1 },
  { id: 3, name: 'City 3', state_id: 2 },
];

// Mock implementations
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
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <CreateLocation />
      </NavigationContainer>
    </ThemeProvider>,
  );
};

describe('CreateLocation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Create Location')).toBeTruthy(); // Assumindo que "Create Location" é o título
    expect(getByText('State')).toBeTruthy(); // Assumindo que "State" é o label do estado
    expect(getByText('City')).toBeTruthy(); // Assumindo que "City" é o label da cidade
  });

  it('submits form successfully', async () => {
    const { getByText } = renderComponent();
    // Simulando a seleção de um estado
    fireEvent.press(getByText('State'));
    fireEvent.press(getByText('State 1')); // Simulando a seleção do estado

    // Simulando a seleção de uma cidade
    fireEvent.press(getByText('City'));
    fireEvent.press(getByText('City 1')); // Simulando a seleção da cidade

    // Simulando a submissão do formulário
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(mockCreateLocation).toHaveBeenCalledWith({ city: 'City 1' });
      expect(mockGoBack).toHaveBeenCalled();
      expect(mockToast.show).toHaveBeenCalledWith(
        'Location created successfully!',
        {
          type: 'success',
          placement: 'top',
        },
      );
    });
  });

  it('handles error on submission', async () => {
    // Mockando a função createLocation para lançar um erro
    mockCreateLocation.mockImplementationOnce(() => {
      throw new Error('Error creating location');
    });

    const { getByText } = renderComponent();

    fireEvent.press(getByText('State 1'));
    fireEvent.press(getByText('City 1'));

    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(mockToast.show).toHaveBeenCalledWith('Error creating location', {
        type: 'error',
        placement: 'top',
      });
    });
  });
});
