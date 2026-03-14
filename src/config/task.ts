import { Circle, Clock, CheckCircle2 } from 'lucide-vue-next'

export const TASK_STATUS_MAP = {
  'todo': { 
    label: '할 일', 
    icon: Circle, 
    color: 'text-muted-foreground' 
  },
  'in-progress': { 
    label: '진행 중', 
    icon: Clock, 
    color: 'text-blue-500' 
  },
  'done': { 
    label: '완료', 
    icon: CheckCircle2, 
    color: 'text-green-500' 
  }
} as const

export const TASK_PRIORITY_STYLES = {
  'low': 'bg-gray-100 text-gray-600 border-gray-200',
  'medium': 'bg-blue-50 text-blue-600 border-blue-200',
  'high': 'bg-red-50 text-red-600 border-red-200'
} as const

export type TaskStatus = keyof typeof TASK_STATUS_MAP
export type TaskPriority = keyof typeof TASK_PRIORITY_STYLES
