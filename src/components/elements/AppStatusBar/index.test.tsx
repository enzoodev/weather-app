import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import { AppStatusBar } from './index';

const topInsets = 20;

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: topInsets,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

describe('AppStatusBar Component', () => {
  it('renders correctly with the safe area insets and theme', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <AppStatusBar />
      </ThemeProvider>,
    );

    const { props } = getByTestId('container-test');
    expect(props.style.paddingTop).toBe(topInsets);
  });
});
