<script setup lang="ts">
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: "%s - My Aplikasiku",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
