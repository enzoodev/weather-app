import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { Input } from './index';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Input', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Test Input" />,
    );

    expect(getByPlaceholderText('Test Input')).toBeTruthy();
  });

  it('shows error message when formError is provided', () => {
    const { getByText } = renderWithTheme(
      <Input formError="This field is required" />,
    );

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('shows default border color when not focused and no error', () => {
    const { getByTestId } = renderWithTheme(<Input />);

    const inputWrapper = getByTestId('input-wrapper-test');
    expect(inputWrapper.parent.props.borderColor).toBe(
      theme.colors.inputBorder,
    );
  });

  it('shows error border color when formError is present', () => {
    const { getByTestId } = renderWithTheme(
      <Input formError="This field is required" />,
    );

    const inputWrapper = getByTestId('input-wrapper-test');
    expect(inputWrapper.parent.props.borderColor).toBe(theme.colors.error);
  });

  it('is disabled when isDisabled prop is true', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Test Input" isDisabled />,
    );

    const input = getByPlaceholderText('Test Input');
    expect(input.props.editable).toBe(false);
  });

  it('is editable when isDisabled prop is false', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Test Input" isDisabled={false} />,
    );

    const input = getByPlaceholderText('Test Input');
    expect(input.props.editable).toBe(true);
  });
});
