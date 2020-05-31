<template>
  <div class="news">
    <ContentDetailPageTemplate>
      <template slot="left-sidebar">
        Categories
      </template>
      <template slot="content-container">
        Title
      </template>
      <template slot="right-sidebar">
        Content Types
      </template>
    </ContentDetailPageTemplate>
  </div>
</template>

<script>
import ContentDetailPageTemplate from '../components/entity/ContentDetailPageTemplate.vue';

export default {
  name: 'News',
  components: {
    ContentDetailPageTemplate,
  },
};
</script>
