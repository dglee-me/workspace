<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  isAllSelected: boolean
}

defineProps<Props>()
defineEmits(['move', 'delete', 'toggle-all'])
</script>

<template>
  <div class="h-[38px] flex items-center bg-background border-b px-4 shrink-0">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <Checkbox 
          id="select-all" 
          :checked="isAllSelected"
          @update:checked="$emit('toggle-all', $event)" 
        />
      </div>
      <div class="flex items-center gap-1">
        <button 
          class="h-7 px-3 flex items-center hover:bg-accent hover:text-accent-foreground transition-all text-muted-foreground font-semibold text-xs"
          @click="$emit('move')"
        >
          이동
        </button>
        <button 
          class="h-7 px-3 flex items-center hover:bg-accent hover:text-accent-foreground transition-all text-muted-foreground font-semibold text-xs"
          @click="$emit('delete')"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
</template>
