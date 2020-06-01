<template>
  <v-autocomplete
    multiple
    return-object
    v-model="state.lazyValue"
    :items="state.categories"
    item-value="id"
    item-text="name"
    label="Category"
    placeholder="Type category name"
  />
</template>

<script>
import { reactive, watch, onMounted } from '@vue/composition-api';

import CategoryApi from './api/CategoryApi';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup({ value }, { emit }) {
    const state = reactive({
      lazyValue: [],
      categories: [],
    });

    watch(
      () => value,
      (newValue) => {
        state.lazyValue = newValue;
      },
    );

    watch(
      () => state.lazyValue,
      (values) => emit('input', values),
    );

    onMounted(async () => {
      state.categories = await CategoryApi.getCategories();
    });

    return {
      state,
    };
  },
};

</script>
