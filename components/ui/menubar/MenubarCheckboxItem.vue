<script setup lang="ts">
import type {
  MenubarCheckboxItemEmits,
  MenubarCheckboxItemProps,
} from "radix-vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import {
  MenubarCheckboxItem,
  MenubarItemIndicator,
  useForwardPropsEmits,
} from "radix-vue";
import { computed } from "vue";

const props = defineProps<
  MenubarCheckboxItemProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<MenubarCheckboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <MenubarCheckboxItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 15 15"
          class="w-4 h-4"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M3 3h9v9H3zM2 3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm8.35 2.511a.5.5 0 0 0-.825-.566L6.64 9.15L5.197 7.41a.5.5 0 0 0-.77.638l1.866 2.25a.5.5 0 0 0 .797-.037z"
            clip-rule="evenodd"
          />
        </svg>
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
