<template>
  <div>
    <v-row>
      <v-col
        v-for="(tag, index) in lazyValue"
        :key="`tag-${index}`"
      >
        <v-chip
          close
          @click:close="remove(tag)"
        >
          {{ tag }}
        </v-chip>
      </v-col>
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
import { watch, ref, computed } from '@vue/composition-api';
import TagApi from './api/TagsApi';
import { useTwoWayBinding } from '../helpers/binding';
import { useSearchWithCleaningAfterEvent } from '../helpers/searching';

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
    const { lazyValue, updateValue } = useTwoWayBinding(value, emit);
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

    const addTag = (tag) => {
      if (!lazyValue.value.includes(tag)) {
        lazyValue.value.push(tag);
      }

      cleanSearch();
    };

    const search = computed({
      get() {
        return searchText.value;
      },
      async set(newTag) {
        searchText.value = newTag;

        if (searchText.value && searchText.value.length >= 3) {
          if (searchText.value.slice(-1) === ',') {
            addTag(searchText.value.slice(0, -1));
          } else {
            const result = await TagApi.getTags(searchText.value);

            if (result) {
              isSearching.value = true;
              activeTags.value = result.filter((tag) => !lazyValue.value.includes(tag));
            }
          }
        }

        isSearching.value = false;
      },
    });

    watch(() => search.value, async (newTag) => {
      search.value = newTag;

      if (newTag && newTag.length >= 3) {
        if (newTag.slice(-1) === ',') {
          addTag(newTag.slice(0, -1));
        } else {
          const result = await TagApi.getTags(newTag);

          if (result) {
            isSearching.value = true;
            activeTags.value = result.filter((tag) => !lazyValue.value.includes(tag));
          }
        }
      }

      isSearching.value = false;
    });

    return {
      lazyValue,
      search,
      isSearching,
      activeTags,
      remove,
      addTag,
      onTagsChanged,
    };
  },
};
</script>
