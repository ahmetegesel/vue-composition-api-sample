<template>
  <v-autocomplete
    multiple
    return-object
    v-model="lazyValue"
    :items="lazySources"
    item-value="id"
    item-text="name"
    label="Source"
    placeholder="Type Source name"
    :search-input.sync="search"
    @change="onSearchInputChanged"
  />
</template>
<script>
import SourceApi from './api/SourceApi';
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
      lazyItems: lazySources,
      search,
      onSearchInputChanged,
    } = useSearchableSelect(value, emit, () => SourceApi.getSources());

    return {
      lazySources,
      lazyValue,
      search,
      onSearchInputChanged,
    };
  },
};
</script>
