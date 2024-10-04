import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Text } from 'react-native';
import { theme } from '@/theme';
import { Label } from './index';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('Label', () => {
  it('renders correctly with a title and children', () => {
    const { getByText } = renderWithTheme(
      <Label title="Test Title">
        <Text>Child Component</Text>
      </Label>,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Child Component')).toBeTruthy();
  });

  it('applies disabled styles when isDisabled is true', () => {
    const { getByTestId } = renderWithTheme(
      <Label title="Test Title" isDisabled>
        <Text>Child Component</Text>
      </Label>,
    );

    const container = getByTestId('container-test');
    expect(container.props.style.opacity).toBe(0.5);
  });

  it('does not apply disabled styles when isDisabled is false', () => {
    const { getByTestId } = renderWithTheme(
      <Label title="Test Title" isDisabled={false}>
        <Text>Child Component</Text>
      </Label>,
    );

    const container = getByTestId('container-test');
    expect(container.props.style.opacity).toBe(1);
  });
});
