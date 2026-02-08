import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../contexts/AppContext'
import { STATUSES } from '../api/todos'
import type { Todo } from '../types'
import { RxDotsVertical } from "react-icons/rx";
import { AiOutlinePaperClip } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const iconDots = <RxDotsVertical className="size-5" />
const iconPaperclip = <AiOutlinePaperClip className="size-4" />
const iconChat = <IoChatbubbleEllipsesOutline className="size-4" />

type Props = {
  task: Todo
  isDragging?: boolean
  showStatusBadge?: boolean
}

export default function TaskCard({ task, isDragging = false, showStatusBadge = true }: Props) {
  const { t } = useTranslation()
  const { removeTask, moveTaskStatus } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const status = task.status || 'todo'

  function getStatusColor() {
    if (status === 'todo') return 'bg-[var(--color-col-todo)]'
    if (status === 'on_progress') return 'bg-[var(--color-col-progress)]'
    if (status === 'need_review') return 'bg-[var(--color-col-review)]'
    return 'bg-[var(--color-col-done)]'
  }

  function getStatusLabel() {
    if (status === 'on_progress') return t('columns.onProgress')
    if (status === 'need_review') return t('columns.needReview')
    if (status === 'done') return t('columns.done')
    return t('columns.todo')
  }

  return (
    <div
      className={'card-hover rounded-[var(--radius-card)] border border-[var(--color-app-border)] bg-[var(--color-app-surface)] p-3 shadow-[var(--shadow-card)] ' + (isDragging ? 'opacity-60' : '')}
      data-testid="task-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-[var(--color-app-muted)]">
            <span>{new Date(Date.now() - task.id * 86400000).toLocaleDateString()}</span>
          </div>
          <p className="mt-1 font-medium text-[var(--color-app-text)] line-clamp-1">{task.todo}</p>
          <p className="mt-0.5 text-xs text-[var(--color-app-muted)] line-clamp-2">{task.todo}</p>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded p-1 text-[var(--color-app-muted)] hover:bg-[var(--color-app-border)]/50 hover:text-[var(--color-app-text)]"
            aria-label="Options"
          >
            {iconDots}
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface)] py-1 shadow-lg">
                <p className="px-3 py-1 text-xs font-medium text-[var(--color-app-muted)]">{t('task.moveTo')}</p>
                {STATUSES.filter((s) => s !== status).map((s) => {
                  let label = ''
                  if (s === 'on_progress') label = t('columns.onProgress')
                  else if (s === 'need_review') label = t('columns.needReview')
                  else if (s === 'done') label = t('columns.done')
                  else label = t('columns.todo')
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        moveTaskStatus(task.id, s)
                        setMenuOpen(false)
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--color-app-border)]/50"
                    >
                      {label}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => {
                    removeTask(task.id)
                    setMenuOpen(false)
                  }}
                  className="w-full px-3 py-1.5 text-left text-sm text-red-500 hover:bg-[var(--color-app-border)]/50"
                >
                  {t('task.delete')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[var(--color-app-muted)]">
        <span className="flex items-center gap-1">
          {iconPaperclip}
          0
        </span>
        <span className="flex items-center gap-1">
          {iconChat}
          0
        </span>
        {showStatusBadge && (
          <span className={'rounded-full px-2 py-0.5 text-white ' + getStatusColor()}>
            {getStatusLabel()}
          </span>
        )}
      </div>
    </div>
  )
}
