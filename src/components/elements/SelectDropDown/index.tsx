/* eslint-disable no-plusplus */
import { memo, useCallback, useMemo, useState } from 'react';
import { ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
} from 'tabler-react-native/icons';
import { useTranslation } from 'react-i18next';

import { generateId } from '@/utils/generateId';
import { CollapsableContainer } from '@/components/elements/CollapsableContainer';

import * as S from './styles';

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
          <S.ListEmptyTitle>{t('selectDropDown.list_empty')}</S.ListEmptyTitle>
        );
      }

      return filteredItems.map(item => {
        const isSelected = item.value === value;

        return (
          <S.Item
            key={generateId()}
            isSelected={isSelected}
            onPress={() => handleChangeValue(item)}
          >
            <S.ItemTitle isSelected={isSelected}>{item.label}</S.ItemTitle>
            {isSelected && (
              <IconCheck
                stroke={1.5}
                size={theme.iconSizes.sm}
                color={theme.colors.textPrimary}
              />
            )}
          </S.Item>
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
      <S.FullWrapper {...rest}>
        <S.Container hasFormError={hasFormError}>
          <S.Header isOpen={isOpen} onPress={toggleOpen}>
            {isShowPlaceholder ? (
              <S.Placeholder>
                {placeholder || t('selectDropDown.placeholder')}
              </S.Placeholder>
            ) : (
              <S.Title>{selectedItemLabel}</S.Title>
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
          </S.Header>
          <CollapsableContainer isExpanded={isOpen}>
            <S.Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: theme.layout[4],
                paddingTop: theme.layout[4],
                paddingBottom: theme.layout[2],
              }}
              nestedScrollEnabled
            >
              <S.SearchInput
                placeholderTextColor={theme.colors.placeholder}
                selectionColor={theme.colors.placeholder}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={t('selectDropDown.placeholder_search')}
                value={searchText}
                onChangeText={setSearchText}
              />
              {renderItems()}
            </S.Content>
          </CollapsableContainer>
        </S.Container>
        {hasFormError && <S.FormError>{formError}</S.FormError>}
      </S.FullWrapper>
    );
  },
);
