<script setup lang="ts">
const colorMode = useColorMode();
const setTheme = (value: "dark" | "light") => (colorMode.preference = value);
</script>

<template>
  <ClientOnly>
    <Button
      variant="ghost"
      size="icon"
      @click="setTheme(colorMode.value === 'light' ? 'dark' : 'light')"
      class="transition-none">
      <IconsMoon
        v-if="colorMode.value === 'light'"
        class="flex-shrink-0 h-5 w-5" />
      <IconsSun
        v-if="colorMode.value === 'dark'"
        class="flex-shrink-0 h-5 w-5" />
    </Button>
    <template #fallback>
      <button class="h-9"></button>
    </template>
  </ClientOnly>
</template>
