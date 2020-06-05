import { onMounted, ref } from '@vue/composition-api';
import { useTwoWayAutoBinding } from './binding';
import { useSortArrayBySelected } from './sorting';
import { filterByGivenObjects, isFunction, isNullOrUndefined } from '../../helpers';
import { useSearchWithCleaningAfterEvent } from './searching';

// eslint-disable-next-line import/prefer-default-export
export const useSearchableSelect = (value, emit, items) => {
  if (isNullOrUndefined(items)) {
    throw new Error('You must define valid items Array or a Function to retrieve them.');
  }

  const { lazyValue } = useTwoWayAutoBinding(value, emit);

  const itemsRef = ref(isFunction(items) ? [] : items);
  const { lazyItems } = useSortArrayBySelected(itemsRef, lazyValue, filterByGivenObjects);

  if (isFunction(items)) {
    onMounted(async () => {
      itemsRef.value = await items();
    });
  }

  const { search, onChanged: onSearchInputChanged } = useSearchWithCleaningAfterEvent();

  return {
    lazyItems,
    lazyValue,
    search,
    onSearchInputChanged,
  };
};
