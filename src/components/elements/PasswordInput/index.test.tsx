import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { PasswordInput } from './index';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('PasswordInput', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <PasswordInput placeholder="Password" />,
    );

    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows error message when formError is provided', () => {
    const { getByText } = renderWithTheme(
      <PasswordInput formError="This field is required" />,
    );

    expect(getByText('This field is required')).toBeTruthy();
  });

  it('shows default border color when not focused and no error', () => {
    const { getByTestId } = renderWithTheme(<PasswordInput />);

    const inputWrapper = getByTestId('input-wrapper-test');
    expect(inputWrapper.parent.props.borderColor).toBe(
      theme.colors.inputBorder,
    );
  });

  it('shows error border color when formError is present', () => {
    const { getByTestId } = renderWithTheme(
      <PasswordInput formError="This field is required" />,
    );

    const inputWrapper = getByTestId('input-wrapper-test');
    expect(inputWrapper.parent.props.borderColor).toBe(theme.colors.error);
  });
});
