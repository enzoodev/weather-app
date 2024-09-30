import { ReactNode } from 'react';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  keyboardMultiple?: number;
};

export const AnimatedKeyboardWrapper = ({
  children,
  keyboardMultiple = 0.5,
}: Props) => {
  const keyboard = useAnimatedKeyboard();

  const translateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value * keyboardMultiple }],
    flex: 1,
  }));

  return <Animated.View style={translateStyle}>{children}</Animated.View>;
};
