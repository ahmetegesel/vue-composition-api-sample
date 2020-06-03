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
import CategoryApi from './api/CategoryApi';
import { useSearchableSelect } from '../helpers/selects';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup({ value }, { emit }) {
    const {
      lazyValue,
      lazyItems: lazyCategories,
      search,
      onSearchInputChanged,
    } = useSearchableSelect(value, emit, () => CategoryApi.getCategories());

    return {
      lazyCategories,
      lazyValue,
      search,
      onSearchInputChanged,
    };
  },
};

</script>
