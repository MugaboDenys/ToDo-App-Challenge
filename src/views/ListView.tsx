import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../contexts/AppContext'
import AddTaskForm from '../components/AddTaskForm'
import type { TodoStatus } from '../types'

const columnColors: Record<string, string> = {
  todo: 'var(--color-col-todo)',
  on_progress: 'var(--color-col-progress)',
  need_review: 'var(--color-col-review)',
  done: 'var(--color-col-done)',
}

const columnKeys: TodoStatus[] = ['todo', 'on_progress', 'need_review', 'done']

export default function ListView() {
  const { t } = useTranslation()
  const { tasks, loading, error, updateTask } = useApp()
  const [addingSection, setAddingSection] = useState<TodoStatus | null>(null)

  function getTasksByStatus(status: TodoStatus) {
    return tasks.filter((task) => (task.status || 'todo') === status)
  }

  function getColumnLabel(statusKey: TodoStatus) {
    if (statusKey === 'on_progress') return t('columns.onProgress')
    if (statusKey === 'need_review') return t('columns.needReview')
    return t('columns.' + statusKey)
  }

  function getStatusLabel(status: TodoStatus) {
    if (status === 'on_progress') return t('columns.onProgress')
    if (status === 'need_review') return t('columns.needReview')
    return t('columns.' + status)
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-[var(--color-app-muted)]">
        {t('common.loading')}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-red-500">
        {t('common.error')}: {error}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      {columnKeys.map((statusKey) => {
        const sectionTasks = getTasksByStatus(statusKey)
        const columnLabel = getColumnLabel(statusKey)

        return (
          <section
            key={statusKey}
            className="rounded-xl border border-[var(--color-app-border)] bg-[var(--color-app-surface)] overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[var(--color-app-border)] bg-[var(--color-app-bg)]/50 px-4 py-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (addingSection === statusKey) setAddingSection(null)
                    else setAddingSection(statusKey)
                  }}
                  className="text-[var(--color-app-muted)] hover:text-[var(--color-primary)]"
                >
                  +
                </button>
                <span className="font-semibold text-[var(--color-app-text)]">{columnLabel}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: columnColors[statusKey] }}
                >
                  {sectionTasks.length}
                </span>
              </div>
            </div>
            {addingSection === statusKey && (
              <div className="border-b border-[var(--color-app-border)] p-4">
                <AddTaskForm
                  defaultStatus={statusKey}
                  onAdded={() => setAddingSection(null)}
                  onCancel={() => setAddingSection(null)}
                />
              </div>
            )}
            <div className="divide-y divide-[var(--color-app-border)]">
              {sectionTasks.length === 0 && !addingSection && (
                <div className="px-4 py-8 text-center text-sm text-[var(--color-app-muted)]">
                  {t('common.empty')}
                </div>
              )}
              {sectionTasks.map((task) => {
                const taskStatus = task.status || 'todo'
                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-[var(--color-app-bg)]/30"
                  >
                    <input
                      type="checkbox"
                      checked={!!task.completed}
                      onChange={() => updateTask(task.id, { completed: !task.completed })}
                      className="size-4 rounded border-[var(--color-app-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[var(--color-app-text)] truncate">{task.todo}</p>
                      <p className="text-xs text-[var(--color-app-muted)]">
                        {new Date(Date.now() - task.id * 86400000).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium text-white shrink-0"
                      style={{ backgroundColor: columnColors[taskStatus] }}
                    >
                      {getStatusLabel(taskStatus)}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
