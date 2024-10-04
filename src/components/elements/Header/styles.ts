import styled, { css } from 'styled-components/native';

export type ContainerTypeStyleProps = {
  hasBackButton?: boolean;
  hasRightComponent?: boolean;
};

export type GoBackButtonTypeStyleProps = {
  hasRightComponent?: boolean;
};

type TitleTypeStyleProps = {
  hasBackButton?: boolean;
};

export const Container = styled.View<ContainerTypeStyleProps>`
  flex-direction: row;
  align-items: center;
  ${({ hasBackButton, hasRightComponent }) => {
    let justifyContent;

    switch (true) {
      case hasBackButton && hasRightComponent:
        justifyContent = 'space-between';
        break;
      case hasBackButton:
        justifyContent = 'center';
        break;
      case hasRightComponent:
        justifyContent = 'space-between';
        break;
      default:
        justifyContent = 'flex-start';
    }

    return css`
      justify-content: ${justifyContent};
    `;
  }};
`;

export const Title = styled.Text<TitleTypeStyleProps>`
  ${({ theme, hasBackButton }) => css`
    font-family: ${theme.fonts.main.bold};
    font-size: ${hasBackButton ? theme.fontSizes.lg : theme.fontSizes.xl}px;
    color: ${theme.colors.textPrimary};
  `}
`;

export const GoBackButtonWrapper = styled.TouchableOpacity<GoBackButtonTypeStyleProps>`
  ${({ hasRightComponent }) =>
    !hasRightComponent &&
    css`
      position: absolute;
      left: 0;
    `};
`;
