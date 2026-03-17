<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Props {
  isAllSelected: boolean;
}

defineProps<Props>();
defineEmits(["move", "delete", "toggle-all"]);
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
        <Button
          variant="ghost"
          class="h-7 px-3 text-muted-foreground font-semibold transition-colors"
          @click="$emit('move')"
        >
          이동
        </Button>
        <Button
          variant="ghost"
          class="h-7 px-3 text-muted-foreground font-semibold transition-colors"
          @click="$emit('delete')"
        >
          삭제
        </Button>
      </div>
    </div>
  </div>
</template>
