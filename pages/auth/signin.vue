<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { SignInSchema } from "@/lib/schemas/auth.schema";

definePageMeta({ middleware: ["not-authenticated"], layout: false });
useHead({ title: "Login bang" });

const loginSchema = toTypedSchema(SignInSchema);
const form = useForm({ validationSchema: loginSchema });
const onSubmit = form.handleSubmit(async (values) => {
  const res = await $fetch("/api/auth/sign-in", {
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
      <h1 class="text-3xl font-medium opacity-90">Login</h1>
      <p class="opacity-60">Enter your email below to login to your account</p>
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
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="****" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button class="w-full" type="submit">Sign In</Button>
    </form>

    <div class="flex w-full items-center">
      <span class="grow border-b"></span>
      <p class="mx-2 grow-0 text-[0.75rem] font-light uppercase opacity-80">
        or continue with
      </p>
      <span class="grow border-b"></span>
    </div>

    <div class="flex flex-col gap-4 font-medium">
      <Button
        asChild
        class="flex w-full items-center gap-2 bg-[#5865F2] text-foreground hover:bg-[#5865F2]/80"
      >
        <a href="/api/auth/discord">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0a13 13 0 0 0-.617-1.25a.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.08.08 0 0 0 .084-.028a14 14 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13 13 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10 10 0 0 0 .372-.292a.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01q.181.149.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028a19.8 19.8 0 0 0 6.002-3.03a.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418"
            />
          </svg>
          <span>Discord</span>
        </a>
      </Button>
      <Button
        asChild
        class="flex w-full items-center gap-2 bg-[#D0463B] text-foreground hover:bg-[#D0463B]/80"
      >
        <a href="/api/auth/google">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.956 10.356v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.28 5.28 0 0 1 0-10.559a5.166 5.166 0 0 1 3.29 1.178l2.6-2.6a8.93 8.93 0 1 0-5.89 15.635c4.467 0 8.529-3.249 8.529-8.934a7.468 7.468 0 0 0-.2-1.625l-8.329.001Z"
            />
          </svg>
          <span>Google</span>
        </a>
      </Button>
    </div>

    <div class="flex flex-col gap-4 text-center text-sm text-foreground/70">
      <p>
        Don't have an account?
        <NuxtLink
          to="/auth/signup"
          class="underline decoration-emerald-500 hover:text-foreground text-foreground/80"
        >
          Sign Up
        </NuxtLink>
      </p>

      <a
        to="/auth/forgot-password"
        class="underline decoration-emerald-500 hover:text-foreground text-foreground/80"
      >
        Forgot Password?
      </a>
    </div>
  </div>
</template>
