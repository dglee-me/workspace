<script setup lang="ts">
import { computed } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ChevronDown } from 'lucide-vue-next'

const workspaceStore = useWorkspaceStore()
const currentWorkspace = computed(() => workspaceStore.currentWorkspace)

const emojis = ['🚀', '✨', '🌈', '🥑', '🦊', '🎨', '🧩', '🌙', '🍀', '🍎', '👾', '🧸', '💡', '🔥']

// 워크스페이스 이름을 기반으로 결정적인 랜덤 이모티콘 선택
const workspaceEmoji = computed(() => {
  const name = currentWorkspace.value.name
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % emojis.length
  return emojis[index]
})
</script>

<template>
  <SidebarHeader class="p-0 flex justify-center h-[var(--header-height)] border-b border-sidebar-border shrink-0">
    <SidebarMenu class="w-full h-full m-0">
      <SidebarMenuItem class="w-full h-full">
        <SidebarMenuButton size="lg" class="cursor-pointer rounded-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full h-full px-4">
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-secondary border border-border text-lg shrink-0 overflow-hidden shadow-sm">
            {{ workspaceEmoji }}
          </div>
          <div class="flex flex-1 items-center text-left text-sm leading-tight ml-2 overflow-hidden">
            <span class="truncate font-semibold text-foreground">{{ currentWorkspace.name }}</span>
          </div>
          <ChevronDown class="ml-auto size-4 text-muted-foreground shrink-0" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</template>
