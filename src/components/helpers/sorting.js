import { ref, watch } from '@vue/composition-api';
import { sortArrayBy, toRaw } from '../../helpers';

// eslint-disable-next-line import/prefer-default-export
export const useSortArrayBySelected = (items, selectedItems, filterFn) => {
  const lazyItems = ref([]);

  const sortItems = () => sortArrayBy(filterFn)(
    toRaw(items),
    toRaw(selectedItems),
  );

  const updateSelectedItems = () => {
    lazyItems.value = sortItems();
  };

  watch(() => toRaw(selectedItems), () => {
    updateSelectedItems();
  });

  watch(() => toRaw(items), () => {
    updateSelectedItems();
  });

  return {
    lazyItems,
  };
};
