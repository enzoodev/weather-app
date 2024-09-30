/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as S from './styles';

export const AppStatusBar = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <S.Container paddingTop={insets.top}>
      <StatusBar
        translucent
        style="light"
        backgroundColor={theme.colors.main}
      />
    </S.Container>
  );
};
