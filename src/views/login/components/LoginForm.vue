<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = (e: Event) => {
  e.preventDefault()
  authStore.login()
  router.push("/projects")
}

const handleSocialLogin = () => {
  authStore.login()
  router.push("/projects")
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="overflow-hidden p-0">
      <CardContent class="grid p-0 md:grid-cols-2">
        <form class="p-6 md:p-8" @submit="handleLogin">
          <FieldGroup>
            <div class="flex flex-col items-center gap-2 text-center">
              <h1 class="text-2xl font-bold">워크스페이스
              </h1>
              <p class="text-muted-foreground text-balance">
                구글 로그인으로 내 업무 흐름을 관리해보세요.
              </p>
            </div>
            <Field>
              <FieldLabel for="email">
                이메일 주소
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@example.org"
                required
                tabindex="1"
              />
            </Field>
            <Field>
              <div class="flex items-center">
                <FieldLabel for="password">
                  비밀번호
                </FieldLabel>
                <a
                  href="#"
                  class="ml-auto text-sm underline-offset-2 hover:underline"
                  tabindex="4"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required tabindex="2" />
            </Field>
            <Field>
              <Button type="submit" class="w-full" tabindex="3">
                로그인
              </Button>
            </Field>
            <FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
              혹은
            </FieldSeparator>
            <Field class="grid grid-cols-1 gap-4">
              <Button variant="outline" type="button" class="w-full" @click="handleSocialLogin" tabindex="5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Google로 로그인
              </Button>
            </Field>
            <FieldDescription class="text-center">
              계정이 없으신가요?
              <a href="#" class="underline underline-offset-4 hover:text-primary">
                Sign up
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
        <div class="bg-muted relative hidden md:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          >
        </div>
      </CardContent>
    </Card>
    <FieldDescription class="px-6 text-center">
      By clicking continue, you agree to our <a href="#" class="underline underline-offset-4 hover:text-primary">Terms of Service</a>
      and <a href="#" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
    </FieldDescription>
  </div>
</template>
