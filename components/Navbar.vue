<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "vue-sonner";
import { cn } from "@/lib/utils";

const links = [
  { name: "home", route: "/" },
  { name: "hello", route: "/hello" },
];
const { data } = await useFetch("/api/auth/me");
const route = useRoute();

const logout = async () => {
  await $fetch("/api/auth/sign-out", {
    method: "POST",
  }).then(() => {
    navigateTo("/auth/signin");
  });
};
</script>

<template>
  <div class="fixed top-0 z-50 w-dvw">
    <header class="top-0 z-50 w-full bg-background border-b border-accent/20">
      <div class="container flex h-14 items-center px-2 pr-4">
        <nav class="hidden h-full items-center gap-6 md:flex">
          <NuxtLink
            v-for="link in links"
            :to="link.route"
            :class="
              cn(
                'text-base font-medium capitalize transition-colors duration-200 hover:text-foreground',
                route.path.includes(link.name) ? 'text-accent' : 'text-muted'
              )
            "
          >
            {{ link.name }}
          </NuxtLink>
        </nav>
        <div class="mt-2 flex flex-1 items-center justify-end">
          <Menubar
            class="h-full rounded-full p-0 active:border-border border-transparent focus-within:border-border"
          >
            <MenubarMenu>
              <MenubarTrigger
                class="rounded-full p-0 data-[state=open]:bg-transparent data-[highlighted]:bg-transparent data-[state=open]:text-accent data-[highlighted]:text-accent"
              >
                <Avatar class="h-7 w-7" v-if="data?.user">
                  <AvatarImage
                    :src="
                      data?.user?.avatar ??
                      'https://avatars.githubusercontent.com/u/62535762?v=4'
                    "
                    alt="@yogyy github avatar"
                  />
                  <AvatarFallback>YG</AvatarFallback>
                </Avatar>
                <IconsPerson v-else class="h-5 w-5 bg-transparent" />
              </MenubarTrigger>
              <MenubarContent
                align="end"
                class="bg-background border-border/20"
              >
                <MenubarItem class="focus:bg-background focus:text-foreground">
                  Theme
                  <MenubarShortcut @click="(e) => e.stopPropagation()">
                    <DarkMode />
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem @click="() => toast('ok gas')">
                  idk, something
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem v-if="data?.user" @click="logout">
                  Sign Out
                </MenubarItem>
                <MenubarItem
                  v-if="!data?.user"
                  @click="navigateTo('/auth/signin')"
                >
                  Sign In
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  </div>
</template>
