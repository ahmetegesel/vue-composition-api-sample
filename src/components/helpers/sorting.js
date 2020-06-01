import { isRef, ref, watch } from '@vue/composition-api';
import { sortArrayBy } from '../../helpers';

// eslint-disable-next-line import/prefer-default-export
export const useSortArrayBySelected = (items, selectedItems, filterFn) => {
  const lazyItems = ref([]);

  const sortItems = () => sortArrayBy(filterFn)(
    isRef(items) ? items.value : items,
    isRef(selectedItems) ? selectedItems.value : selectedItems,
  );

  const updateSelectedItems = () => {
    lazyItems.value = sortItems();
  };

  watch(isRef(selectedItems) ? () => selectedItems.value : () => selectedItems, () => {
    updateSelectedItems();
  });

  watch(isRef(items) ? () => items.value : () => items, () => {
    updateSelectedItems();
  });

  return {
    lazyItems,
  };
};
