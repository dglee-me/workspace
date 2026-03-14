<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import TaskListItem from './TaskListItem.vue'
import type { Task, Project } from '@/stores/workspace'

interface Props {
  tasks: Task[]
  currentProject?: Project
  selectedTaskId: string | null
  selectedTaskIds: string[]
  statusMap: any
  priorityStyles: any
}

defineProps<Props>()
defineEmits(['select-task', 'toggle-task-check'])
</script>

<template>
  <div class="h-full flex flex-col border-r">
    <div class="flex-1 overflow-y-auto bg-background">
      <template v-if="tasks.length > 0">
        <TaskListItem 
          v-for="task in tasks" 
          :key="task.id"
          :task="task"
          :is-selected="selectedTaskId === task.id"
          :is-checked="selectedTaskIds.includes(task.id)"
          :status-icon="statusMap[task.status].icon"
          :status-color="statusMap[task.status].color"
          :priority-style="priorityStyles[task.priority]"
          @select="$emit('select-task', $event)"
          @toggle-check="$emit('toggle-task-check', $event)"
        />
      </template>
      <div v-else class="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-4 px-6 text-center">
        <AlertCircle class="w-12 h-12 stroke-[1px]" />
        <p class="text-sm font-medium">프로젝트를 선택하거나 테스크를 추가해 주세요</p>
      </div>
    </div>
  </div>
</template>
