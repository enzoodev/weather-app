/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Styled from './styles';

export const AppStatusBar = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Styled.Container paddingTop={insets.top} testID="container-test">
      <StatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
    </Styled.Container>
  );
};
