import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ViewSwitcher from './ViewSwitcher'

describe('ViewSwitcher', () => {
  it('renders Kanban and List buttons', () => {
    const setView = vi.fn()
    render(<ViewSwitcher view="kanban" setView={setView} />)
    expect(screen.getByRole('button', { name: /kanban/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /list/i })).toBeInTheDocument()
  })

  it('calls setView with "list" when List is clicked', () => {
    const setView = vi.fn()
    render(<ViewSwitcher view="kanban" setView={setView} />)
    fireEvent.click(screen.getByRole('button', { name: /list/i }))
    expect(setView).toHaveBeenCalledWith('list')
  })

  it('calls setView with "kanban" when Kanban is clicked', () => {
    const setView = vi.fn()
    render(<ViewSwitcher view="list" setView={setView} />)
    fireEvent.click(screen.getByRole('button', { name: /kanban/i }))
    expect(setView).toHaveBeenCalledWith('kanban')
  })
})
