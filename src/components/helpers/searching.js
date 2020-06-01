import { ref } from '@vue/composition-api';

// eslint-disable-next-line import/prefer-default-export
export const useSearchWithCleaningAfterSelection = () => {
  const search = ref('');

  const onChanged = () => {
    search.value = '';
  };

  return {
    search,
    onChanged,
  };
};
