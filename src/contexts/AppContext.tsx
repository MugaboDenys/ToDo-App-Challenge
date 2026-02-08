import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as api from '../api/todos'
import type { Todo, ViewMode, Theme, SortOption, TodoStatus } from '../types'

const VIEW_KANBAN: ViewMode = 'kanban'
const VIEW_LIST: ViewMode = 'list'

type AppContextType = {
  theme: Theme
  toggleTheme: () => void
  locale: string
  setLocale: (lng: string) => void
  view: ViewMode
  setView: (view: ViewMode) => void
  search: string
  setSearch: (search: string) => void
  sort: SortOption
  setSort: (sort: SortOption) => void
  tasks: Todo[]
  rawTasks: Todo[]
  loading: boolean
  error: string | null
  loadTasks: () => void
  addTask: (payload: { todo: string; completed?: boolean; userId?: number }) => Promise<Todo | null>
  updateTask: (id: number, patch: { todo?: string; completed?: boolean }) => Promise<Todo | null>
  moveTaskStatus: (id: number, newStatus: TodoStatus) => void
  removeTask: (id: number) => void
}

const AppContext = createContext<AppContextType | null>(null)

function getThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('todo-theme')
  if (stored === 'dark' || stored === 'light') return stored
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()

  const [theme, setThemeState] = useState<Theme>(getThemeFromStorage)
  const [tasks, setTasks] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<ViewMode>(VIEW_KANBAN)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('default')

  // update document and localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('todo-theme', theme)
  }, [theme])

  // load tasks on mount
  useEffect(() => {
    setLoading(true)
    setError(null)
    api
      .fetchTodos(50, 0)
      .then((data) => {
        setTasks(data.todos)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function toggleTheme() {
    if (theme === 'light') {
      setThemeState('dark')
    } else {
      setThemeState('light')
    }
  }

  function setLocale(lng: string) {
    i18n.changeLanguage(lng)
  }

  function loadTasks() {
    setLoading(true)
    setError(null)
    api
      .fetchTodos(50, 0)
      .then((data) => {
        setTasks(data.todos)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  async function addTask(payload: { todo: string; completed?: boolean; userId?: number }) {
    try {
      const created = await api.addTodo(payload)
      const newTask = api.toAppTodo({ ...created, status: 'todo' })
      setTasks((prev) => [newTask, ...prev])
      return created
    } catch (err) {
      setError((err as Error).message)
      return null
    }
  }

  async function updateTask(id: number, patch: { todo?: string; completed?: boolean }) {
    try {
      const updated = await api.updateTodo(id, patch)
      let newStatus = updated.status
      if (patch.completed === true) newStatus = 'done'
      if (patch.completed === false) newStatus = 'todo'
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === id) {
            return { ...t, ...updated, status: newStatus }
          }
          return t
        })
      )
      return updated
    } catch (err) {
      setError((err as Error).message)
      return null
    }
  }

  function moveTaskStatus(id: number, newStatus: TodoStatus) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: newStatus, completed: newStatus === 'done' }
        }
        return t
      })
    )
    const task = tasks.find((t) => t.id === id)
    if (task && newStatus === 'done') {
      api.updateTodo(id, { completed: true }).catch(() => {})
    }
    if (task && task.completed && newStatus !== 'done') {
      api.updateTodo(id, { completed: false }).catch(() => {})
    }
  }

  function removeTask(id: number) {
    api
      .deleteTodo(id)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id))
      })
      .catch((err) => {
        setError((err as Error).message)
      })
  }

  // filter and sort tasks for display
  let filteredTasks = tasks
  if (search.trim() !== '') {
    const q = search.toLowerCase()
    filteredTasks = filteredTasks.filter((t) => t.todo.toLowerCase().includes(q))
  }
  if (sort === 'name') {
    filteredTasks = [...filteredTasks].sort((a, b) => a.todo.localeCompare(b.todo))
  }
  if (sort === 'status') {
    filteredTasks = [...filteredTasks].sort((a, b) => a.status.localeCompare(b.status))
  }

  const value: AppContextType = {
    theme,
    toggleTheme,
    locale: i18n.language,
    setLocale,
    view,
    setView,
    search,
    setSearch,
    sort,
    setSort,
    tasks: filteredTasks,
    rawTasks: tasks,
    loading,
    error,
    loadTasks,
    addTask,
    updateTask,
    moveTaskStatus,
    removeTask,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider')
  }
  return ctx
}

export { VIEW_KANBAN, VIEW_LIST }
