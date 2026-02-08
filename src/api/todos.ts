import type { Todo, TodoStatus } from '../types'

const BASE = 'https://dummyjson.com/todos'

/** DummyJSON returns { id, todo, completed, userId }. We extend with local status. */
export const STATUSES: readonly TodoStatus[] = ['todo', 'on_progress', 'need_review', 'done']

interface ApiTodo {
  id: number
  todo: string
  completed: boolean
  userId: number
  status?: TodoStatus
}

export function toAppTodo(item: ApiTodo): Todo {
  return {
    id: item.id,
    todo: item.todo,
    completed: Boolean(item.completed),
    userId: item.userId,
    status: item.completed ? 'done' : (item.status ?? 'todo'),
  }
}

export async function fetchTodos(limit = 50, skip = 0): Promise<{ todos: Todo[]; total: number }> {
  const res = await fetch(`${BASE}?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  const data = await res.json()
  return {
    todos: (data.todos ?? []).map(toAppTodo),
    total: data.total ?? 0,
  }
}

export interface AddTodoPayload {
  todo: string
  completed?: boolean
  userId?: number
}

export async function addTodo(payload: AddTodoPayload): Promise<Todo> {
  const { todo, completed = false, userId = 1 } = payload
  const res = await fetch(`${BASE}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo, completed, userId }),
  })
  if (!res.ok) throw new Error('Failed to add todo')
  return toAppTodo(await res.json())
}

export async function updateTodo(id: number, patch: Partial<Pick<Todo, 'todo' | 'completed'>>): Promise<Todo> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error('Failed to update todo')
  return toAppTodo(await res.json())
}

export async function deleteTodo(id: number): Promise<unknown> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete todo')
  return res.json()
}
