import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { Text } from 'react-native';
import { Header } from './index';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Header', () => {
  it('renders title correctly', () => {
    const { getByText } = renderWithTheme(<Header title="Test Title" />);

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('renders back button when onBackButtonPress is provided', () => {
    const mockOnBackButtonPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Header title="Test Title" onBackButtonPress={mockOnBackButtonPress} />,
    );

    const backButton = getByTestId('go-back-button');
    expect(backButton).toBeTruthy();
  });

  it('does not render back button when onBackButtonPress is not provided', () => {
    const { queryByTestId } = renderWithTheme(<Header title="Test Title" />);

    const backButton = queryByTestId('go-back-button');
    expect(backButton).toBeNull();
  });

  it('calls onBackButtonPress when back button is pressed', () => {
    const mockOnBackButtonPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Header title="Test Title" onBackButtonPress={mockOnBackButtonPress} />,
    );

    const backButton = getByTestId('go-back-button');
    fireEvent.press(backButton);

    expect(mockOnBackButtonPress).toHaveBeenCalledTimes(1);
  });

  it('renders right component when provided', () => {
    const { getByText } = renderWithTheme(
      <Header
        title="Test Title"
        rightComponent={<Text>Right Component</Text>}
      />,
    );

    expect(getByText('Right Component')).toBeTruthy();
  });
});
