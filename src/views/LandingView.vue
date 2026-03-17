<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { Layout, Layers, CheckCircle2, Users } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const handleGoToLogin = () => {
  router.push("/login");
};

// Redirect if already logged in
if (authStore.isLoggedIn) {
  router.push("/projects");
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <header class="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between"
      >
        <div class="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div class="bg-primary p-1.5 rounded-md">
            <Layout class="h-4 w-4 text-primary-foreground" />
          </div>
          <span>WORKSPACE</span>
        </div>

        <div class="flex">
          <Button size="sm" @click="handleGoToLogin">
            로그인 / 회원가입
          </Button>
        </div>
      </div>
    </header>
    <main
      class="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-4"
    >
      <div class="space-y-4">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight">
          복잡한 업무를 <br />
          <span class="text-muted-foreground">더 단순하게.</span>
        </h1>
        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          그룹부터 태스크까지.<br />
          하나의 워크스페이스에서 모든 업무 흐름을 관리하세요.
        </p>
      </div>
      <!-- Saturn Orbit Container -->
      <div
        class="relative w-64 h-64 flex items-center justify-center perspective-[1000px]"
      >
        <!-- The Saturn (Emoji) -->
        <div
          class="text-8xl select-none z-10 drop-shadow-2xl animate-bounce-slow"
        >
          🤔
        </div>

        <!-- The Rings (Orbiting Icons) -->
        <div
          class="absolute inset-0 flex items-center justify-center preserve-3d rotate-x-[65deg] -rotate-y-[15deg] animation-orbit-container"
        >
          <!-- Orbiting Modules -->
          <div
            v-for="(icon, index) in [Layout, Layers, CheckCircle2, Users]"
            :key="index"
            class="absolute w-12 h-12 bg-white border border-neutral-100 rounded-xl shadow-lg flex items-center justify-center animation-orbit-item"
            :style="{ '--index': index, '--total': 4 }"
          >
            <component :is="icon" class="h-6 w-6" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.perspective-\[1000px\] {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.rotate-x-\[65deg\] {
  transform: rotateX(65deg);
}

.-rotate-y-\[15deg\] {
  transform: rotateX(65deg) rotateY(-15deg);
}

.animation-orbit-container {
  animation: orbit-rotate 20s linear infinite;
}

.animation-orbit-item {
  /* Position items on the ring */
  --radius: 140px;
  --angle: calc((var(--index) / var(--total)) * 360deg);
  transform: rotateZ(var(--angle)) translateX(var(--radius))
    rotateZ(calc(-1 * var(--angle))) rotateX(-65deg);
  animation: item-counter-rotate 20s linear infinite;
}

@keyframes orbit-rotate {
  from {
    transform: rotateX(65deg) rotateY(-15deg) rotateZ(0deg);
  }
  to {
    transform: rotateX(65deg) rotateY(-15deg) rotateZ(360deg);
  }
}

@keyframes item-counter-rotate {
  /* Keep icons upright while orbiting */
  from {
    transform: rotateZ(var(--angle)) translateX(var(--radius)) rotateX(-65deg)
      rotateZ(0deg);
  }
  to {
    transform: rotateZ(var(--angle)) translateX(var(--radius)) rotateX(-65deg)
      rotateZ(-360deg);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
