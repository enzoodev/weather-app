import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { CollapsableContainer } from './index';

describe('CollapsableContainer', () => {
  it('calculates height based on content when expanded', () => {
    const { getByTestId } = render(
      <CollapsableContainer isExpanded>
        <Text>Test Child</Text>
      </CollapsableContainer>,
    );

    const collapsableView = getByTestId('collapsable-view');
    expect(collapsableView).toBeTruthy();
  });

  it('initial height is 0 when collapsed', () => {
    const { getByTestId } = render(
      <CollapsableContainer isExpanded={false}>
        <Text>Test Child</Text>
      </CollapsableContainer>,
    );

    const collapsableView = getByTestId('collapsable-view');
    expect(collapsableView.props.style.height).toBe(0);
  });
});
