<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ChevronLeft } from 'lucide-vue-next'
import type { Task, Project } from '@/stores/workspace'

interface Props {
  task: Task | null
  project?: Project
  statusMap: any
  priorityStyles: any
}

defineProps<Props>()
defineEmits(['back'])
</script>

<template>
  <div v-if="task" class="h-full flex flex-col bg-muted/3">
    <!-- Mobile Back Button -->
    <div class="md:hidden flex items-center p-4 bg-background/50 backdrop-blur-sm border-b sticky top-0 z-10">
      <Button variant="ghost" size="sm" class="gap-1 -ml-2" @click="$emit('back')">
        <ChevronLeft class="w-4 h-4" />
        <span>목록으로</span>
      </Button>
    </div>

    <div class="p-8 max-w-4xl mx-auto w-full flex-1 overflow-y-auto space-y-8">
      <!-- Status & Priority -->
      <div class="flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border">
          <component 
            :is="statusMap[task.status].icon" 
            :class="['w-4 h-4', statusMap[task.status].color]" 
          />
          <span class="text-xs font-semibold">{{ statusMap[task.status].label }}</span>
        </div>
        <div class="flex items-center gap-4">
          <Badge 
            variant="outline" 
            :class="['text-[10px] font-bold px-2 py-0.5 tracking-widest', priorityStyles[task.priority]]"
          >
            {{ task.priority.toUpperCase() }}
          </Badge>
          <div v-if="task.dueDate" class="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Calendar class="w-4 h-4" />
            <span>{{ task.dueDate }}</span>
          </div>
        </div>
      </div>

      <!-- Title & Project Info -->
      <div class="space-y-4">
        <h1 class="text-4xl font-extrabold tracking-tight text-foreground leading-tight">{{ task.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <div class="flex items-center gap-1.5">
            <div v-if="project" :class="['w-2 h-2 rounded-full', project.color]"></div>
            <span>{{ project?.name }}</span>
          </div>
          <Separator orientation="vertical" class="h-3" />
          <span>담당자: 이동근</span>
        </div>
      </div>
      
      <Separator />

      <!-- Description -->
      <div class="space-y-6">
        <div class="flex items-center gap-2">
          <div class="w-1 h-4 bg-primary rounded-full"></div>
          <h3 class="text-sm font-bold uppercase tracking-widest text-muted-foreground">작업 설명</h3>
        </div>
        <div class="bg-muted/20 rounded-2xl p-6 border border-dashed text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap font-medium">
          {{ task.description }}
        </div>
      </div>

      <!-- Meta Info -->
      <div class="pt-12 grid grid-cols-2 gap-12">
        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">최근 업데이트</p>
          <p class="text-sm font-medium">오늘 오후 2시 30분</p>
        </div>
        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">생성일</p>
          <p class="text-sm font-medium">2024년 3월 10일</p>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/5 px-6 py-12">
    <div class="relative w-24 h-24 mb-6">
      <div class="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-20"></div>
      <div class="relative flex items-center justify-center w-full h-full rounded-full bg-muted/20 border-2 border-dashed">
        <Clock class="w-8 h-8 opacity-20 stroke-[1.5]" />
      </div>
    </div>
    <h3 class="text-xl font-bold text-foreground/40 mb-2">선택된 작업 없음</h3>
    <p class="text-sm opacity-40 max-w-[240px] text-center leading-relaxed">목록에서 작업을 선택하면 세부 정보가 여기에 표시됩니다.</p>
  </div>
</template>
