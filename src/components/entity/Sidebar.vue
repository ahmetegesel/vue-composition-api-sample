<template>
  <div class="content-sidebar">
    <slot />
  </div>
</template>

<style scoped>
  .content-sidebar {
    background: #efefef;
    height: 100%;
  }
  .content-sidebar > div {
    background: #efefef;
    padding: 20px;
    margin: 0;
  }
  .content-sidebar > div:not(:first-child) {
    border-top: 1px solid #d0d0d0;
  }
</style>
