import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AppProvider } from '../contexts/AppContext'
import TaskCard from './TaskCard'
import type { Todo } from '../types'

describe('TaskCard', () => {
  const task: Todo = { id: 1, todo: 'Test task title', completed: false, userId: 1, status: 'todo' }

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ todos: [] }) })
    )
  })

  it('renders task title', async () => {
    render(
      <AppProvider>
        <TaskCard task={task} />
      </AppProvider>
    )
    const card = await screen.findByTestId('task-card')
    expect(card).toHaveTextContent('Test task title')
  })

  it('has task card test id', async () => {
    render(
      <AppProvider>
        <TaskCard task={task} />
      </AppProvider>
    )
    await waitFor(() => expect(screen.getByTestId('task-card')).toBeInTheDocument())
    expect(screen.getByTestId('task-card')).toBeInTheDocument()
  })
})
