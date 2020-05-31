<template>
  <v-row no-gutters>
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
        <slot name="right-sidebar"/>
      </Sidebar>
    </v-col>
  </v-row>
</template>
