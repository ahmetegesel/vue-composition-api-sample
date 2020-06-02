<template>
  <div>
    <v-btn @click="increment">Count is: {{ toRaw(count) }}</v-btn>
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

const compose = (component) => {
  const options = {
    ...component.setup(),
  };

  options.methods.toRaw = (object) => object.value;

  return options;
};

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
