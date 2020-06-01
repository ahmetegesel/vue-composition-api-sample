import { ref } from '@vue/composition-api';

export const useSearch = () => {
  const search = ref('');

  return {
    search,
  };
};

export const useSearchWithCleaningAfterSelection = () => {
  const { search } = useSearch();

  const onChanged = () => {
    search.value = '';
  };

  return {
    search,
    onChanged,
  };
};
