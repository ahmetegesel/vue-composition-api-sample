<template>
  <div class="news">
    <ContentDetailPageTemplate>
      <template slot="left-sidebar">
        <Category v-model="news.categories"/>
        <Source v-model="news.sources"/>
      </template>
      <template slot="content-container">
        <Tags v-model="news.tags" />
      </template>
      <template slot="right-sidebar">
        Content Types
      </template>
      <template slot="action">
        <v-btn @click="showModel">Show Model</v-btn>
      </template>
    </ContentDetailPageTemplate>
  </div>
</template>

<script>
import ContentDetailPageTemplate from '../components/entity/ContentDetailPageTemplate.vue';
import Category from '../components/category/Category.vue';
import Source from '../components/source/Source.vue';
import Tags from '../components/tags/Tags.vue';

export default {
  name: 'News',
  components: {
    ContentDetailPageTemplate,
    Category,
    Source,
    Tags,
  },
  data() {
    return {
      news: {
        categories: [],
        sources: [],
        tags: [],
      },
    };
  },
  methods: {
    showModel() {
      console.log(this.news); // eslint-disable-line no-console
    },
  },
};
</script>
