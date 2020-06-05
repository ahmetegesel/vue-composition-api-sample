import { ref, watch } from '@vue/composition-api';
import { isFunction } from '../../helpers';

export const useTwoWayBinding = (valueProp, emit, defaultValue) => {
  const lazyValue = ref(defaultValue);

  watch(() => valueProp, (newValue) => { lazyValue.value = newValue; });

  const updateValue = (newValue) => {
    emit('input', newValue);
  };

  return {
    lazyValue,
    updateValue,
  };
};

export const useTwoWayAutoBinding = (valueProp, emit, defaultValue) => {
  const { lazyValue, updateValue } = useTwoWayBinding(valueProp, emit, defaultValue);

  if (emit && isFunction(emit)) {
    watch(() => lazyValue.value, (newValue) => {
      updateValue(newValue);
    });
  }

  return {
    lazyValue,
    updateValue,
  };
};
