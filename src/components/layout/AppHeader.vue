<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut } from 'lucide-vue-next'
</script>

<template>
  <header class="p-4 border-b flex items-center justify-between h-[var(--header-height)] shrink-0 sticky top-0 bg-background/80 backdrop-blur z-10 transition-colors">
    <div class="flex items-center gap-2">
      <SidebarTrigger class="-ml-2 hover:bg-accent p-2 rounded-md transition-colors cursor-pointer" />
    </div>
    
    <div class="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar class="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">이동근</p>
              <p class="text-xs leading-none text-muted-foreground">donggeun@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User class="mr-2 h-4 w-4" />
              <span>내 프로필</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings class="mr-2 h-4 w-4" />
              <span>설정</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut class="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
