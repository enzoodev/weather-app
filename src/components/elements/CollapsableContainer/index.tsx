import { memo, useState, ReactNode, useCallback, useEffect } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from './styles';

type Props = {
  children: ReactNode;
  isExpanded: boolean;
};

export const CollapsableContainer = memo(({ children, isExpanded }: Props) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const layoutHeight = event.nativeEvent.layout.height;

      if (layoutHeight > 0 && height !== layoutHeight) {
        setHeight(layoutHeight);
      }
    },
    [height],
  );

  useEffect(() => {
    if (height > 0) {
      animatedHeight.value = isExpanded
        ? withTiming(height, { duration: 150 })
        : withTiming(0, { duration: 250 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, height]);

  const collapsableStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
      <S.ContentWrapper onLayout={onLayout}>{children}</S.ContentWrapper>
    </Animated.View>
  );
});
