import { ReactNode, memo } from 'react';
import { ViewProps } from 'react-native';

import * as S from './styles';

type Props = ViewProps & {
  title: string;
  children: ReactNode;
  isDisabled?: boolean;
};

export const Label = memo(
  ({ title, isDisabled = false, children, ...rest }: Props) => {
    return (
      <S.Container isDisabled={isDisabled} {...rest}>
        <S.Title>{title}</S.Title>
        {children}
      </S.Container>
    );
  },
);
