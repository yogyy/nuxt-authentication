<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { SignUpSchema } from "@/lib/schemas/auth.schema";

definePageMeta({ middleware: ["not-authenticated"], layout: false });
useHead({ title: "Daftar bang" });

const loginSchema = toTypedSchema(SignUpSchema);
const form = useForm({ validationSchema: loginSchema });

const onSubmit = form.handleSubmit(async (values) => {
  const res = await $fetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-type": "application/json" },
  });

  if (res?.success) navigateTo("/");
});
</script>

<template>
  <div class="container flex max-w-lg flex-col justify-center gap-4">
    <div class="mt-48 space-y-3">
      <h1 class="text-3xl font-medium opacity-90">Sign Up</h1>
      <p class="opacity-60">Enter your detail below to create your account</p>
    </div>

    <form @submit="onSubmit" class="w-full space-y-2">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="youremail@mail.com"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="name"
              placeholder="Kimi no, Namaewa"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="****" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="w-full" type="submit">Create Account</Button>
    </form>
    <div
      class="flex flex-col gap-4 text-center text-sm text-pretty text-foreground/70"
    >
      <p class="decoration-emerald-500">
        <span>By clicking continue, you agree to our </span>
        <a
          href="/support/terms-of-service"
          class="underline hover:text-foreground text-foreground/90"
        >
          Terms of Services
        </a>
        <span> and </span>
        <a
          href="/support/privacy-policy"
          class="underline hover:text-foreground text-foreground/90"
        >
          Privacy Policy
        </a>
      </p>
      <p class="decoration-emerald-500">
        <span>Already have an account? </span>
        <NuxtLink
          to="/auth/signin"
          class="underline hover:text-foreground text-foreground/90"
        >
          Sign In
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
