<script setup lang="ts">
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useWorkspaceStore } from '@/stores/workspace'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import WorkspaceSwitcher from './WorkspaceSwitcher.vue'

import { Plus } from 'lucide-vue-next'

const route = useRoute()
const workspaceStore = useWorkspaceStore()
const activeProjects = computed(() => workspaceStore.activeProjects)

const currentProjectId = computed(() => route.params.id as string)
</script>

<template>
  <div class="flex flex-col w-full h-full bg-sidebar">
    <WorkspaceSwitcher />
    <SidebarContent class="pt-4">
      <SidebarGroup>
        <div class="flex items-center justify-between">
          <SidebarGroupLabel class="tracking-wider">내 프로젝트</SidebarGroupLabel>
          <button class="text-muted-foreground hover:text-foreground transition-all p-1 rounded-md hover:bg-accent/80">
            <Plus class="w-3.5 h-3.5" />
          </button>
        </div>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="project in activeProjects" :key="project.id">
              <SidebarMenuButton 
                as-child 
                :is-active="currentProjectId === project.id"
              >
                <router-link :to="{ name: 'projects', params: { id: project.id } }">
                  <div :class="['w-2 h-2 rounded-full shrink-0', project.color]"></div>
                  <span>{{ project.name }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </div>
</template>
