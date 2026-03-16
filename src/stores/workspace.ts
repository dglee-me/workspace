import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Project {
  id: string
  name: string
  status: 'active' | 'completed' | 'archived'
  color?: string
}

export interface Workspace {
  id: string
  name: string
  avatarUrl?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  projectId: string
  dueDate?: string
}

export const useWorkspaceStore = defineStore('workspace', () => {
  // 모의(Mock) 데이터
  const currentWorkspace = ref<Workspace>({
    id: '1',
    name: '이동근의 워크스페이스',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=gemini'
  })

  // 나에게 할당된 프로젝트 목록 Mock 데이터
  const assignedProjects = ref<Project[]>([
    { id: '1', name: '사이드바 UI 개편', status: 'active', color: 'bg-blue-500' },
    { id: '2', name: '새로운 캘린더 연동', status: 'active', color: 'bg-green-500' },
    { id: '3', name: '사용자 데이터 마이그레이션', status: 'active', color: 'bg-indigo-400' },
    { id: '4', name: '1분기 성과 보고서 작성', status: 'completed', color: 'bg-gray-400' },
  ])

  // 나에게 할당된 테스크 목록 Mock 데이터
  const assignedTasks = ref<Task[]>([
    { id: '1', projectId: '1', title: '사이드바 디자인 시안 검토', description: '새로운 사이드바 디자인에 대한 피드백을 반영하여 최종안 확정', status: 'in-progress', priority: 'high', dueDate: '2024-03-20' },
    { id: '2', projectId: '1', title: '아이콘 라이브러리 교체', description: 'Lucide 아이콘으로 전체 교체 및 일관성 확인', status: 'todo', priority: 'medium' },
    { id: '3', projectId: '2', title: 'Google Calendar API 연동', description: 'OAuth2 인증 및 일정 가져오기 기능 구현', status: 'todo', priority: 'high' },
    { id: '4', projectId: '3', title: '데이터 스키마 설계', description: '새로운 DB 구조에 맞는 마이그레이션 스크립트 작성', status: 'done', priority: 'medium' },
  ])

  const activeProjects = computed(() =>
    assignedProjects.value.filter(p => p.status === 'active')
  )

  const completedProjects = computed(() =>
    assignedProjects.value.filter(p => p.status === 'completed')
  )

  const getProjectById = (id: string) => {
    return assignedProjects.value.find(p => p.id === id)
  }

  const getTaskById = (id: string) => {
    return assignedTasks.value.find(t => t.id === id)
  }

  const getTasksByProjectId = (projectId: string) => {
    return assignedTasks.value.filter(t => t.projectId === projectId)
  }

  return {
    currentWorkspace,
    assignedProjects,
    assignedTasks,
    activeProjects,
    completedProjects,
    getProjectById,
    getTaskById,
    getTasksByProjectId
  }
})
