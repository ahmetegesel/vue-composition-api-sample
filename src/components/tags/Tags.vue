<template>
  <div>
    <v-row>
      <div
        v-for="(tag, index) in lazyValue"
        :key="`tag-${index}`"
      >
        <v-chip
          close
          @click:close="remove(tag)"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-row>
    <v-autocomplete
      label="Add tag..."
      :loading="isSearching"
      :items="activeTags"
      :search-input.sync="search"
      @change="onTagsChanged"
    >
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title v-html="item" />
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import { useTwoWayBinding } from '../helpers/binding';
import { useSearchWithCleaningAfterEvent } from '../helpers/searching';
import { searchTags, addTag } from './helpers';

export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  setup({ value }, { emit }) {
    const activeTags = ref([]);
    const isSearching = ref(false);
    const { lazyValue, updateValue } = useTwoWayBinding(value, emit, []);
    const { search: searchText, onChanged: cleanSearch } = useSearchWithCleaningAfterEvent();

    const onTagsChanged = (newValue) => {
      cleanSearch();
      lazyValue.value.push(newValue);
      activeTags.value = [];
      updateValue(lazyValue.value);
    };

    const remove = (item) => {
      lazyValue.value = lazyValue.value.filter((tag) => tag !== item);
    };

    const search = computed({
      get() {
        return searchText.value;
      },
      async set(newTag) {
        searchText.value = newTag;

        if (searchText.value && searchText.value.length >= 3) {
          if (searchText.value.slice(-1) === ',') {
            lazyValue.value = addTag(searchText.value.slice(0, -1), lazyValue.value);
            cleanSearch();
          } else {
            activeTags.value = await searchTags(searchText.value, lazyValue.value);
            isSearching.value = true;
          }
        }

        isSearching.value = false;
      },
    });

    return {
      lazyValue,
      search,
      isSearching,
      activeTags,
      remove,
      onTagsChanged,
    };
  },
};
</script>
