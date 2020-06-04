import { ref, watch } from '@vue/composition-api';
import { isFunction } from '../../helpers';

export const baseTwoWayBinding = (valueProp) => {
  const lazyValue = ref([]);

  watch(() => valueProp, (newValue) => { lazyValue.value = newValue; });

  return {
    lazyValue,
  };
};

export const useTwoWayBinding = (valueProp, emit, callback) => {
  const { lazyValue } = baseTwoWayBinding(valueProp);

  if (emit && isFunction(emit)) {
    watch(() => lazyValue.value, (newValue) => {
      emit('input', newValue);

      if (callback && typeof callback === 'function') {
        callback(lazyValue);
      }
    });
  }

  return {
    lazyValue,
  };
};

export const useTwoWayManuelBinding = (valueProp, emit) => {
  const { lazyValue } = baseTwoWayBinding(valueProp);

  const triggerInput = (newValue) => {
    emit('input', newValue);
  };

  return {
    lazyValue,
    triggerInput,
  };
};
