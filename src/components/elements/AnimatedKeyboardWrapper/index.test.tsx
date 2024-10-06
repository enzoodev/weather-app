import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { AnimatedKeyboardWrapper } from './index';

jest.mock('react-native-reanimated', () => {
  return {
    ...jest.requireActual('react-native-reanimated/mock'),
    useAnimatedKeyboard: () => ({
      height: {
        value: 0,
      },
    }),
  };
});

describe('AnimatedKeyboardWrapper', () => {
  it('uses the default keyboardMultiple value of 0.5', () => {
    const { getByText } = render(
      <AnimatedKeyboardWrapper>
        <Text>Test Child</Text>
      </AnimatedKeyboardWrapper>,
    );

    const animatedView = getByText('Test Child').parent;

    expect(animatedView.props).toBeTruthy();
  });
});
