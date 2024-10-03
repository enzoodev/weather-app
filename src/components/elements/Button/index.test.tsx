import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { Button } from './index';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  const renderButton = (props = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <Button title="Test Button" onPress={mockOnPress} {...props} />
      </ThemeProvider>,
    );

  it('should render the button with the correct title', () => {
    const { getByText } = renderButton();
    const buttonText = getByText('Test Button');
    expect(buttonText).toBeTruthy();
  });

  it('should call the onPress function when button is pressed', () => {
    const { getByText } = renderButton();
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should show loading indicator when isLoading is true', () => {
    const { getByTestId } = renderButton({ isLoading: true });
    const activityIndicator = getByTestId('loading-indicator');
    expect(activityIndicator).toBeTruthy();
  });
});
