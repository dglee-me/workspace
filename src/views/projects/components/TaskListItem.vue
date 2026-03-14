<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from 'lucide-vue-next'
import type { Task } from '@/stores/workspace'

interface Props {
  task: Task
  isSelected: boolean
  isChecked: boolean
  statusIcon: any
  statusColor: string
  priorityStyle: string
}

defineProps<Props>()
defineEmits(['select', 'toggle-check'])
</script>

<template>
  <div 
    :class="[
      'group p-4 border-b cursor-pointer transition-colors hover:bg-muted/30 relative flex gap-3 items-start',
      isSelected ? 'bg-primary/5' : ''
    ]"
    @click="$emit('select', task.id)"
  >
    <div v-if="isSelected" class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
    
    <!-- Selection Checkbox -->
    <div class="pt-0.5" @click.stop>
      <Checkbox 
        :checked="isChecked" 
        @update:checked="$emit('toggle-check', task.id)"
      />
    </div>

    <div class="flex-1 flex flex-col gap-2 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <h3 :class="[
          'text-sm font-semibold line-clamp-1 transition-colors',
          isSelected ? 'text-primary' : 'group-hover:text-primary'
        ]">
          {{ task.title }}
        </h3>
        <component 
          :is="statusIcon" 
          :class="['w-4 h-4 shrink-0', statusColor]" 
        />
      </div>
      <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{{ task.description }}</p>
      <div class="flex items-center justify-between mt-1">
        <Badge 
          variant="outline" 
          :class="['text-[10px] h-5 px-1.5 font-medium uppercase tracking-tight', priorityStyle]"
        >
          {{ task.priority }}
        </Badge>
        <div v-if="task.dueDate" class="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
          <Calendar class="w-3 h-3" />
          {{ task.dueDate }}
        </div>
      </div>
    </div>
  </div>
</template>
