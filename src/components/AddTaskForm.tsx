import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../contexts/AppContext'
import type { TodoStatus } from '../types'

type Props = {
  defaultStatus?: TodoStatus
  onAdded?: () => void
  onCancel?: () => void
}

export default function AddTaskForm({ defaultStatus = 'todo', onAdded, onCancel }: Props) {
  const { t } = useTranslation()
  const { addTask, moveTaskStatus } = useApp()
  const [title, setTitle] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    const created = await addTask({ todo: trimmed, completed: false, userId: 1 })
    if (created && defaultStatus !== 'todo') {
      moveTaskStatus(created.id, defaultStatus)
    }
    setTitle('')
    if (onAdded) onAdded()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('task.add')}
        className="flex-1 min-w-[160px] rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface)] px-3 py-2 text-sm text-[var(--color-app-text)] placeholder:text-[var(--color-app-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
        autoFocus
      />
      <button
        type="submit"
        className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        {t('task.add')}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-[var(--color-app-muted)] hover:text-[var(--color-app-text)]">
          Cancel
        </button>
      )}
    </form>
  )
}
