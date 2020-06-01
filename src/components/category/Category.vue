<template>
  <v-autocomplete
    multiple
    return-object
    v-model="lazyValue"
    :items="categories"
    item-value="id"
    item-text="name"
    label="Category"
    placeholder="Type category name"
  />
</template>

<script>
import {
  ref, onMounted,
} from '@vue/composition-api';

import CategoryApi from './api/CategoryApi';
import { useTwoWayBinding } from '../helpers/binding';

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

    onMounted(async () => {
      categories.value = await CategoryApi.getCategories();
    });

    return {
      categories,
      lazyValue,
    };
  },
};

</script>
