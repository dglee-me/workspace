<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkspaceStore } from '@/stores/workspace'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

// Components
import TaskList from './components/TaskList.vue'
import TaskDetail from './components/TaskDetail.vue'
import ProjectToolbar from './components/ProjectToolbar.vue'

import { TASK_STATUS_MAP, TASK_PRIORITY_STYLES } from '@/config/task'

const route = useRoute()
const workspaceStore = useWorkspaceStore()

// State
const selectedTaskId = ref<string | null>(null)
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

const selectedTask = computed(() => {
  if (!selectedTaskId.value) return null
  return workspaceStore.getTaskById(selectedTaskId.value) || null
})

const isAllTasksSelected = computed(() => {
  return tasks.value.length > 0 && selectedTaskIds.value.length === tasks.value.length
})

// Actions
const selectTask = (id: string) => {
  selectedTaskId.value = id
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
watch(() => route.params.id, () => {
  selectedTaskId.value = null
  selectedTaskIds.value = []
})
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden bg-background">
    <ProjectToolbar 
      :is-all-selected="isAllTasksSelected"
      @toggle-all="toggleAllTasks"
    />
    <ResizablePanelGroup direction="horizontal" class="flex-1">
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
