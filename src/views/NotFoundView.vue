<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { FileQuestion, Home, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full bg-background text-center px-4 animate-in fade-in duration-700">
    <div class="relative mb-8">
      <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
      <div class="relative flex items-center justify-center w-24 h-24 rounded-full bg-background border shadow-xl">
        <FileQuestion class="w-12 h-12 text-primary ml-1" />
      </div>
      <div class="absolute -top-2 -right-2 px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full shadow-lg">
        404
      </div>
    </div>

    <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
      페이지를 찾을 수 없습니다
    </h1>
    
    <p class="text-muted-foreground text-lg max-w-md mb-10">
      요청하신 페이지가 존재하지 않거나, 다른 주소로 이동되었을 수 있습니다. 입력하신 주소가 정확한지 다시 한번 확인해 주세요.
    </p>

    <div class="flex flex-col sm:flex-row items-center gap-4">
      <Button 
        variant="outline" 
        size="lg" 
        class="gap-2 px-8 min-w-[160px] border-muted-foreground/20 hover:bg-accent/50 transition-all duration-300"
        @click="goBack"
      >
        <ArrowLeft class="w-4 h-4" />
        이전 페이지
      </Button>
      <Button 
        size="lg" 
        class="gap-2 px-8 min-w-[160px] shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all duration-300"
        @click="goHome"
      >
        <Home class="w-4 h-4" />
        홈으로 이동
      </Button>
    </div>
  </div>
</template>
