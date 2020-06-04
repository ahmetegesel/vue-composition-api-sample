
<template>
  <v-form>
    <v-container>
      <v-row>
        <v-autocomplete
          cache-items
          multiple
          chips
          label="Add tag"
          item-text="name"
          item-value="name"
          v-model="lazyValue"
          :loading="isSearching"
          :items="activeTags"
          :search-input.sync="search"
          @change="onTagsChanged"
        >
          <template v-slot:selection="data">
            <v-chip
              close
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              @click:close="remove(data.item)"
            >
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"/>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"/>
                <v-list-item-subtitle v-html="data.item.group"/>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { watch, ref } from '@vue/composition-api';
import TagApi from './api/TagsApi';
import { useTwoWayManuelBinding } from '../helpers/binding';
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
    const { lazyValue, triggerInput } = useTwoWayManuelBinding(value, emit);
    const { search, onChanged: cleanSearch } = useSearchWithCleaningAfterEvent();

    const onTagsChanged = () => {
      cleanSearch();
      triggerInput(lazyValue);
    };

    const remove = (item) => {
      lazyValue.value.splice(0);
      lazyValue.value.push(lazyValue.value.filter((tag) => tag !== item.name));
    };

    const addTag = (tag) => {
      if (!lazyValue.value.includes(tag)) {
        activeTags.value.push({ name: tag });
        lazyValue.value.push(tag);
        search.value = '';
      }
    };

    watch(() => value, (newValue) => {
      activeTags.value.push(...newValue.map((item) => ({ name: item })));
    });

    watch(() => search.value, async (name) => {
      if (name && name.length >= 3) {
        if (name.slice(-1) === ',') {
          addTag(name.slice(0, -1));
        } else {
          const result = await TagApi.getTags(name);

          if (result) {
            isSearching.value = true;
            activeTags.value = result;
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
