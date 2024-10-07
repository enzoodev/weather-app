import React from 'react';
import { t } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import i18n from '@/lib/language/i18n';
import { SelectDropDown, SelectDropDownItem } from './index';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

describe('SelectDropDown', () => {
  const mockItems: SelectDropDownItem[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  const renderComponent = (props = {}) =>
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <SelectDropDown
            placeholder="Select an option"
            items={mockItems}
            value={null}
            onSelectValue={jest.fn()}
            {...props}
          />
        </ThemeProvider>
      </I18nextProvider>,
    );

  it('renders the placeholder when no value is selected', () => {
    const { getByText } = renderComponent();
    expect(getByText(t('selectDropDown.placeholder'))).toBeTruthy();
  });

  it('opens the dropdown when the header is clicked', () => {
    const { getByText } = renderComponent();
    fireEvent.press(getByText(t('selectDropDown.placeholder')));
    expect(getByText('Option 1')).toBeTruthy();
  });

  it('selects an item when clicked', () => {
    const onSelectValue = jest.fn();
    const { getByText } = renderComponent({ onSelectValue });

    fireEvent.press(getByText(t('selectDropDown.placeholder')));
    fireEvent.press(getByText('Option 1'));
    expect(onSelectValue).toHaveBeenCalledWith(mockItems[0]);
  });

  it('shows the form error message when provided', () => {
    const formError = 'This field is required.';
    const { getByText } = renderComponent({ formError });

    expect(getByText(formError)).toBeTruthy();
  });
});
