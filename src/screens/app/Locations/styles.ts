import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    padding: ${theme.layout[4]};
  `}
`;

export const AddButton = styled.TouchableOpacity``;

export const ListEmptyCard = styled.View``;

export const ListEmptyTitle = styled.Text``;
