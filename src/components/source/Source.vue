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

import { onMounted, ref } from '@vue/composition-api';

import SourceApi from './api/SourceApi';
import { useTwoWayBinding } from '../helpers/binding';
import { useSortArrayBySelected } from '../helpers/sorting';
import { filterByGivenObjects } from '../../helpers';
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

    const sources = ref([]);
    const { lazyItems: lazySources } = useSortArrayBySelected(sources, lazyValue, filterByGivenObjects);

    onMounted(async () => {
      sources.value = await SourceApi.getSources();
    });

    const { search, onChanged: onSearchInputChanged } = useSearchWithCleaningAfterSelection();

    return {
      lazySources,
      lazyValue,
      search,
      onSearchInputChanged,
    };
  },
};
</script>
