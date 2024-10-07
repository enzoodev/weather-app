/* eslint-disable no-plusplus */
import cities from '@/mock/cities.json';
import { SelectDropDownItem } from '@/components/elements/SelectDropDown';

export const filterCitiesByState = (stateId: number): SelectDropDownItem[] => {
  const items: SelectDropDownItem[] = [];

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    if (city.state_id === Number(stateId)) {
      items.push({
        value: city.name,
        label: city.name,
      });
    }
  }

  return items;
};
