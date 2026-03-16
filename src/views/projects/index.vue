<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkspaceStore } from '@/stores/workspace'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

// Components
import TaskList from './components/TaskList.vue'
import TaskDetail from './components/TaskDetail.vue'
import ProjectToolbar from './components/ProjectToolbar.vue'

import { TASK_STATUS_MAP, TASK_PRIORITY_STYLES } from '@/config/task'

const route = useRoute()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('md')

// State
const selectedTaskIds = ref<string[]>([])

// Current Project & Tasks
const currentProject = computed(() => {
  const id = route.params.id as string
  return workspaceStore.getProjectById(id)
})

const tasks = computed(() => {
  if (!currentProject.value) return []
  return workspaceStore.getTasksByProjectId(currentProject.value.id)
})

const selectedTaskId = computed(() => {
  return (route.params.taskId as string) || null
})

const selectedTask = computed(() => {
  if (!selectedTaskId.value) return null
  return workspaceStore.getTaskById(selectedTaskId.value) || null
})

const isAllTasksSelected = computed(() => {
  return tasks.value.length > 0 && selectedTaskIds.value.length === tasks.value.length
})

// Actions
const selectTask = (id: string) => {
  router.push({
    name: 'projects',
    params: { 
      id: route.params.id,
      taskId: id 
    }
  })
}

const toggleTaskSelection = (id: string) => {
  if (selectedTaskIds.value.includes(id)) {
    selectedTaskIds.value = selectedTaskIds.value.filter(taskId => taskId !== id)
  } else {
    selectedTaskIds.value = [...selectedTaskIds.value, id]
  }
}

const toggleAllTasks = (checked: boolean) => {
  selectedTaskIds.value = checked ? tasks.value.map(t => t.id) : []
}

// Reset selection when project changes
watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    selectedTaskIds.value = []
  }
})
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden bg-background">
    <ProjectToolbar 
      v-if="!isMobile || !selectedTaskId"
      :is-all-selected="isAllTasksSelected"
      @toggle-all="toggleAllTasks"
    />
    
    <div v-if="isMobile" class="flex-1 overflow-hidden">
      <TaskDetail 
        v-if="selectedTaskId"
        :task="selectedTask"
        :project="currentProject"
        :status-map="TASK_STATUS_MAP"
        :priority-styles="TASK_PRIORITY_STYLES"
        @back="router.push({ name: 'projects', params: { id: route.params.id } })"
      />
      <TaskList 
        v-else
        :tasks="tasks"
        :current-project="currentProject"
        :selected-task-id="selectedTaskId"
        :selected-task-ids="selectedTaskIds"
        :status-map="TASK_STATUS_MAP"
        :priority-styles="TASK_PRIORITY_STYLES"
        @select-task="selectTask"
        @toggle-task-check="toggleTaskSelection"
      />
    </div>

    <ResizablePanelGroup v-else direction="horizontal" class="flex-1">
      <!-- Left: Task List -->
      <ResizablePanel :default-size="30" :min-size="25">
        <TaskList 
          :tasks="tasks"
          :current-project="currentProject"
          :selected-task-id="selectedTaskId"
          :selected-task-ids="selectedTaskIds"
          :status-map="TASK_STATUS_MAP"
          :priority-styles="TASK_PRIORITY_STYLES"
          @select-task="selectTask"
          @toggle-task-check="toggleTaskSelection"
        />
      </ResizablePanel>

      <ResizableHandle />

      <!-- Right: Task Detail -->
      <ResizablePanel>
        <TaskDetail 
          :task="selectedTask"
          :project="currentProject"
          :status-map="TASK_STATUS_MAP"
          :priority-styles="TASK_PRIORITY_STYLES"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>
