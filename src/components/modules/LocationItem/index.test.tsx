import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { TLocation } from '@/domain/entities/Location';
import { theme } from '@/theme';
import { LocationItem } from './index';

describe('<LocationItem />', () => {
  const mockItem = {
    city: 'Test City',
    description: 'Test description',
    temperature: 300,
    iconCode: '01d',
  } as TLocation;

  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  it('should render correctly', () => {
    const { getByText } = renderWithTheme(
      <LocationItem item={mockItem} onPress={() => {}} />,
    );

    expect(getByText(mockItem.city)).toBeTruthy();
    expect(getByText(mockItem.description)).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <LocationItem item={mockItem} onPress={mockOnPress} />,
    );

    fireEvent.press(getByTestId('location-item'));

    expect(mockOnPress).toHaveBeenCalled();
  });
});
