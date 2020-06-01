<template>
  <div class="news">
    <ContentDetailPageTemplate>
      <template slot="left-sidebar">
        <Category v-model="news.category"/>
      </template>
      <template slot="content-container">
        Title
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

export default {
  name: 'News',
  components: {
    ContentDetailPageTemplate,
    Category,
  },
  data() {
    return {
      news: {
        category: [],
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
