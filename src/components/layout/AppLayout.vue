<script setup lang="ts">
import { SidebarProvider, Sidebar } from '@/components/ui/sidebar'
import NavSidebar from './NavSidebar.vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <SidebarProvider class="h-screen w-full flex overflow-hidden">
    <Sidebar collapsible="offcanvas" class="border-r-0" style="--sidebar-width: 312px; --sidebar-width-mobile: 312px;">
      <div class="flex h-full w-full overflow-hidden">
        <NavSidebar />
        <AppSidebar />
      </div>
    </Sidebar>
    <main class="flex-1 flex flex-col min-w-0 bg-background/95 h-full overflow-hidden">
      <AppHeader />
      <div class="flex-1 overflow-hidden h-full">
        <router-view />
      </div>
    </main>
  </SidebarProvider>
</template>
