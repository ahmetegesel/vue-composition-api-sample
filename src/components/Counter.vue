<template>
  <div>{{ count }} {{ object.foo }} {{name}}</div>
</template>

<script>
import { ref, reactive } from '@vue/composition-api';

export default {
  props: {
    name: String,
  },
  setup() {
    const count = ref(0);
    const object = reactive({ foo: 'bar' });

    // expose to template
    return {
      count,
      object,
    };
  },
};
</script>
