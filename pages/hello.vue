<script setup lang="ts">
definePageMeta({ middleware: ["authenticated"] });
const { data } = useFetch("/api/auth/me");
useHead({ title: data.value?.user?.name });
</script>

<template>
  <div>
    <h1>Hello {{ data?.user?.name }}</h1>
  </div>
</template>
