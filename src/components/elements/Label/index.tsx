import { ReactNode, memo } from 'react';
import { ViewProps } from 'react-native';

import * as Styled from './styles';

type Props = ViewProps & {
  title: string;
  children: ReactNode;
  isDisabled?: boolean;
};

export const Label = memo(
  ({ title, isDisabled = false, children, ...rest }: Props) => {
    return (
      <Styled.Container
        testID="container-test"
        isDisabled={isDisabled}
        {...rest}
      >
        <Styled.Title>{title}</Styled.Title>
        {children}
      </Styled.Container>
    );
  },
);
