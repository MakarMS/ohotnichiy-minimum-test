<script lang="ts" setup>
</script>

<template>
  <div class="wrapper mx-auto px-4 px-sm-8">
    <slot/>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 900px;
}

:deep(ul) {
  padding-left: 1rem;
  margin-left: 0;
  list-style-position: inside;
}
</style>
