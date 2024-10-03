import React from 'react';
import { render } from '@testing-library/react-native';
import Animated from 'react-native-reanimated';
import { AnimatedKeyboardWrapper } from './index';

jest.mock('react-native-reanimated', () => {
  return {
    ...jest.requireActual('react-native-reanimated'),
    useAnimatedKeyboard: jest.fn(() => ({
      height: {
        value: 0,
      },
    })),
    useAnimatedStyle: jest.fn(style => style()),
  };
});

describe('AnimatedKeyboardWrapper', () => {
  it('uses the default keyboardMultiple value of 0.5', () => {
    const { getByText } = render(
      <AnimatedKeyboardWrapper>
        <Animated.Text>Test Child</Animated.Text>
      </AnimatedKeyboardWrapper>,
    );

    const animatedView = getByText('Test Child').parent;

    expect(animatedView.props.style.transform).toEqual([{ translateY: 0 }]);
  });
});
