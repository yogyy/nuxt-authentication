<script setup lang="ts">
definePageMeta({ middleware: ["authenticated"] });
const { data } = useFetch("/api/auth/me");
const url = useRequestURL();
</script>

<template>
  <div>
    <h1>Hello {{ data?.user?.name }}</h1>
  </div>
</template>
