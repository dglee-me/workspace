<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = () => {
  authStore.login();
  router.push("/projects");
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-background text-foreground text-2xl font-bold"
  >
    <span class="cursor-pointer hover:opacity-70 transition-opacity" @click="handleLogin">
      login
    </span>
  </div>
</template>
