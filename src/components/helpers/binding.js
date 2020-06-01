import { ref, watch } from '@vue/composition-api';

// eslint-disable-next-line import/prefer-default-export
export const useTwoWayBinding = (valueProp, emit, callback) => {
  const lazyValue = ref([]);

  watch(() => valueProp, (newValue) => { lazyValue.value = newValue; });
  watch(() => lazyValue.value, (newValue) => {
    emit('input', newValue);

    if (callback && typeof callback === 'function') {
      callback(lazyValue);
    }
  });

  return {
    lazyValue,
  };
};
