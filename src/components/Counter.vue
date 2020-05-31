<template>
  <div>
    <span>{{ name }}</span>
    <button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api';

export default {
  props: {
    name: String,
  },
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2),
    });

    const increment = () => {
      state.count += 1;
    };

    // expose to template
    return {
      state,
      increment,
    };
  },
};
</script>
