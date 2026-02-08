/** DummyJSON API shape */
export interface DummyTodo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

/** App todo: API shape + local status for Kanban columns */
export type TodoStatus = 'todo' | 'on_progress' | 'need_review' | 'done'

export interface Todo extends DummyTodo {
  status: TodoStatus
}

export type ViewMode = 'kanban' | 'list'
export type SortOption = 'default' | 'name' | 'status'
export type Theme = 'light' | 'dark'
