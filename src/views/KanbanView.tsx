import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useApp } from '../contexts/AppContext'
import TaskCard from '../components/TaskCard'
import AddTaskForm from '../components/AddTaskForm'
import type { TodoStatus } from '../types'

const columnColors: Record<string, string> = {
  todo: 'var(--color-col-todo)',
  on_progress: 'var(--color-col-progress)',
  need_review: 'var(--color-col-review)',
  done: 'var(--color-col-done)',
}

const columnKeys: TodoStatus[] = ['todo', 'on_progress', 'need_review', 'done']

export default function KanbanView() {
  const { t } = useTranslation()
  const { tasks, loading, error, moveTaskStatus } = useApp()
  const [addingColumn, setAddingColumn] = useState<TodoStatus | null>(null)

  function getTasksByStatus(status: TodoStatus) {
    return tasks.filter((task) => (task.status || 'todo') === status)
  }

  function handleDragEnd(result: { destination?: { droppableId: string }; draggableId: string }) {
    if (!result.destination) return
    const status = result.destination.droppableId as TodoStatus
    if (columnKeys.indexOf(status) !== -1) {
      const taskId = parseInt(result.draggableId, 10)
      moveTaskStatus(taskId, status)
    }
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 gap-4 overflow-x-auto px-4 pb-4 pt-2">
        {columnKeys.map((statusKey) => {
          const columnTasks = getTasksByStatus(statusKey)
          let columnLabel = ''
          if (statusKey === 'on_progress') columnLabel = t('columns.onProgress')
          else if (statusKey === 'need_review') columnLabel = t('columns.needReview')
          else columnLabel = t('columns.' + statusKey)

          return (
            <div
              key={statusKey}
              className="flex min-w-[280px] max-w-[320px] flex-shrink-0 flex-col rounded-xl border border-[var(--color-app-border)] bg-[var(--color-app-bg)]/50 p-3"
            >
              <div className="flex items-center justify-between gap-2 pb-2">
                <span className="font-semibold text-[var(--color-app-text)]">{columnLabel}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: columnColors[statusKey] }}
                >
                  {columnTasks.length}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (addingColumn === statusKey) setAddingColumn(null)
                    else setAddingColumn(statusKey)
                  }}
                  className="rounded-lg border border-dashed border-[var(--color-app-border)] px-3 py-2 text-sm text-[var(--color-app-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  + {t('task.add')}
                </button>
              </div>
              {addingColumn === statusKey && (
                <AddTaskForm
                  defaultStatus={statusKey}
                  onAdded={() => setAddingColumn(null)}
                  onCancel={() => setAddingColumn(null)}
                />
              )}
              <Droppable droppableId={statusKey}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="mt-2 min-h-[120px] flex-1 space-y-2"
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} isDragging={snapshot.isDragging} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
