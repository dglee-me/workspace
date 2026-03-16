<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { MAIN_NAV_ITEMS } from '@/config/navigation'

const route = useRoute()
const { isMobile, setOpenMobile } = useSidebar()

// 현재 경로가 item.path와 일치하거나 하위 경로인지 확인하여 active 상태 반환
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const handleNavClick = () => {
  if (isMobile.value) {
    setOpenMobile(false)
  }
}
</script>

<template>
  <div class="w-[64px] border-r border-sidebar-border bg-background shrink-0 flex flex-col items-center pb-4 h-full z-10">
      <div class="h-[var(--header-height)] w-full border-sidebar-border shrink-0" />
      <SidebarContent class="flex-1 w-full flex flex-col items-center gap-4">
        <SidebarGroup class="p-0">
          <SidebarGroupContent>
            <SidebarMenu class="flex flex-col gap-1 pt-1 w-full px-1.5">
              <SidebarMenuItem v-for="item in MAIN_NAV_ITEMS" :key="item.id" class="w-full flex justify-center">
                <SidebarMenuButton 
                  as-child
                  :isActive="isActive(item.path)"
                  class="flex flex-col items-center justify-center p-2 rounded-xl h-[52px] w-[52px] gap-1 transition-all duration-200"
                  :class="isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'"
                >
                  <router-link 
                    :to="item.path" 
                    class="flex flex-col items-center"
                    @click="handleNavClick"
                  >
                    <component :is="item.icon" class="w-5 h-5 shrink-0" />
                    <span class="text-[10px] sm:text-xs leading-tight whitespace-nowrap">{{ item.label }}</span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
  </div>
</template>
