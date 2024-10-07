/* eslint-disable no-plusplus */
import { memo, useCallback, useMemo, useState } from 'react';
import { ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
} from 'tabler-react-native/icons';

import { generateId } from '@/utils/generateId';

import { CollapsableContainer } from '@/components/elements/CollapsableContainer';

import * as Styled from './styles';

export type SelectDropDownItem = {
  label: string;
  value: string;
};

type Props = ViewProps & {
  placeholder: string;
  value: string | null;
  items: SelectDropDownItem[];
  onSelectValue: (value: SelectDropDownItem) => void;
  formError?: string;
};

export const SelectDropDown = memo(
  ({ placeholder, value, items, onSelectValue, formError, ...rest }: Props) => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const isShowPlaceholder = !value;
    const hasFormError = !!formError;
    const selectedItemLabel = items.find(item => item.value === value)?.label;

    const filteredItems = useMemo(() => {
      const searchWords = searchText.toLowerCase().split(/\s+/);
      const result: SelectDropDownItem[] = [];

      for (let i = 0; i < items.length; i++) {
        if (result.length >= 10) {
          break;
        }

        const item = items[i];
        const matches = searchWords.every(word =>
          item.label.toLowerCase().includes(word),
        );
        if (matches) {
          result.push(item);
        }
      }

      return result;
    }, [items, searchText]);

    const toggleOpen = useCallback(() => {
      setIsOpen(prevState => !prevState);
    }, []);

    const handleChangeValue = useCallback(
      (data: SelectDropDownItem) => {
        onSelectValue(data);
        toggleOpen();
        setSearchText('');
      },
      [onSelectValue, toggleOpen],
    );

    const renderItems = useCallback(() => {
      if (filteredItems.length === 0) {
        return (
          <Styled.ListEmptyTitle>
            {t('selectDropDown.list_empty')}
          </Styled.ListEmptyTitle>
        );
      }

      return filteredItems.map(item => {
        const isSelected = item.value === value;

        return (
          <Styled.Item
            key={generateId()}
            isSelected={isSelected}
            onPress={() => handleChangeValue(item)}
          >
            <Styled.ItemTitle isSelected={isSelected}>
              {item.label}
            </Styled.ItemTitle>
            {isSelected && (
              <IconCheck
                stroke={1.5}
                size={theme.iconSizes.sm}
                color={theme.colors.textPrimary}
              />
            )}
          </Styled.Item>
        );
      });
    }, [
      filteredItems,
      handleChangeValue,
      theme.colors.textPrimary,
      theme.iconSizes.sm,
      value,
      t,
    ]);

    return (
      <Styled.FullWrapper {...rest}>
        <Styled.Container hasFormError={hasFormError}>
          <Styled.Header
            isOpen={isOpen}
            onPress={toggleOpen}
            disabled={items.length === 0}
          >
            {isShowPlaceholder ? (
              <Styled.Placeholder>
                {placeholder || t('selectDropDown.placeholder')}
              </Styled.Placeholder>
            ) : (
              <Styled.Title>{selectedItemLabel}</Styled.Title>
            )}
            {isOpen ? (
              <IconChevronUp
                stroke={1.25}
                size={theme.iconSizes.md}
                color={theme.colors.textSecondary}
              />
            ) : (
              <IconChevronDown
                stroke={1.25}
                size={theme.iconSizes.md}
                color={theme.colors.textSecondary}
              />
            )}
          </Styled.Header>
          <CollapsableContainer isExpanded={isOpen}>
            <Styled.Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: theme.layout[4],
                paddingTop: theme.layout[4],
                paddingBottom: theme.layout[2],
              }}
              nestedScrollEnabled
            >
              <Styled.SearchInput
                placeholderTextColor={theme.colors.placeholder}
                selectionColor={theme.colors.placeholder}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={t('selectDropDown.placeholder_search')}
                value={searchText}
                onChangeText={setSearchText}
              />
              {renderItems()}
            </Styled.Content>
          </CollapsableContainer>
        </Styled.Container>
        {hasFormError && <Styled.FormError>{formError}</Styled.FormError>}
      </Styled.FullWrapper>
    );
  },
);
