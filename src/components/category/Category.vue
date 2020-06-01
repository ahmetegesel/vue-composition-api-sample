<template>
  <v-autocomplete
    multiple
    return-object
    v-model="lazyValue"
    :items="lazyCategories"
    item-value="id"
    item-text="name"
    label="Category"
    placeholder="Type category name"
  />
</template>

<script>
import {
  ref, onMounted, isRef, watch,
} from '@vue/composition-api';

import CategoryApi from './api/CategoryApi';
import { useTwoWayBinding } from '../helpers/binding';
import { sortArrayBy, filterByGivenObjects } from '../../helpers';

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

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup({ value }, { emit }) {
    const { lazyValue } = useTwoWayBinding(value, emit);

    const categories = ref([]);
    const { lazyItems: lazyCategories } = useSortArrayBySelected(categories, lazyValue, filterByGivenObjects);

    onMounted(async () => {
      categories.value = await CategoryApi.getCategories();
    });

    return {
      lazyCategories,
      lazyValue,
    };
  },
};

</script>
