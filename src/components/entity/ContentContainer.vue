<template>
  <div class="content-container">
    <slot />
  </div>
</template>

<style scoped>
  .content-container {
    background: #ffffff;
    height: 100%;
  }
  .content-container > div {
    padding-left: 30px;
    padding-right: 30px;
  }
  .content-container > div:first-child {
    padding-top: 30px;
  }
  .content-container > div:last-child {
    padding-bottom: 30px;
  }
</style>
