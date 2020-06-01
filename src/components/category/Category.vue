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
    :search-input.sync="search"
    @change="onSearchInputChanged"
  />
</template>

<script>
import { ref, onMounted } from '@vue/composition-api';

import CategoryApi from './api/CategoryApi';
import { useTwoWayBinding } from '../helpers/binding';
import { filterByGivenObjects } from '../../helpers';
import { useSortArrayBySelected } from '../helpers/sorting';
import { useSearchWithCleaningAfterSelection } from '../helpers/searching';

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

    const { search, onChanged: onSearchInputChanged } = useSearchWithCleaningAfterSelection();

    return {
      lazyCategories,
      lazyValue,
      search,
      onSearchInputChanged,
    };
  },
};

</script>
