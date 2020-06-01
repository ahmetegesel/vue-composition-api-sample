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
  />
</template>
<script>

import { onMounted, ref } from '@vue/composition-api';

import { useTwoWayBinding } from '../helpers/binding';
import { useSortArrayBySelected } from '../helpers/sorting';
import { filterByGivenObjects } from '../../helpers';
import SourceApi from './api/SourceApi';

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

    return {
      lazySources,
      lazyValue,
    };
  },
};
</script>
