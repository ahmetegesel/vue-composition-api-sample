<template>
  <div>
    <v-btn @click="increment">Count is: {{ count.value }}</v-btn>
  </div>
</template>

<script>
import Vue from 'vue';

const useCounter = () => {
  const count = Vue.observable({ value: 0 });

  const increment = () => {
    count.value += 1;
  };

  return {
    count,
    increment,
  };
};

const compose = (options) => ({
  ...options.setup(),
});

export default compose({
  setup() {
    const { count, increment } = useCounter();

    return {
      data() {
        return {
          count,
        };
      },
      methods: {
        increment,
      },
    };
  },
});
</script>

<style scoped>

</style>
