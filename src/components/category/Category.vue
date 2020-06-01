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
import CategoryApi from './api/CategoryApi';

export default {
  name: 'Category',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      lazyValue: [],
      categories: [],
    };
  },
  async mounted() {
    this.categories = await CategoryApi.getCategories();
  },
  watch: {
    value(value) {
      this.lazyValue = value;
    },
    lazyValue(values) {
      this.$emit('input', values);
    },
  },
};

</script>
