<template>
  <v-row no-gutters style="height: 93vh">
    <v-col
      cols="12"
      sm="2"
    >
      <Sidebar>
        <slot name="left-sidebar"/>
      </Sidebar>
    </v-col>
    <v-col
      cols="12"
      sm="8"
    >
      <ContentContainer>
        <slot name="content-container"/>
      </ContentContainer>
    </v-col>
    <v-col
      cols="12"
      sm="2"
    >
      <Sidebar>
        <v-row>
          <slot name="right-sidebar"/>
        </v-row>
        <v-row>
          <slot name="action" />
        </v-row>
      </Sidebar>
    </v-col>
  </v-row>
</template>

<script>
import Sidebar from './Sidebar.vue';
import ContentContainer from './ContentContainer.vue';

export default {
  name: 'ContentDetailPageTemplate',
  components: {
    Sidebar,
    ContentContainer,
  },
};
</script>
