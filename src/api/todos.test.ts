import { describe, it, expect, vi, beforeEach } from 'vitest'
import { toAppTodo, fetchTodos, addTodo, updateTodo, deleteTodo, STATUSES } from './todos'

describe('todos API', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('toAppTodo', () => {
    it('maps API todo to app shape with status', () => {
      expect(toAppTodo({ id: 1, todo: 'Test', completed: false, userId: 5 })).toEqual({
        id: 1,
        todo: 'Test',
        completed: false,
        userId: 5,
        status: 'todo',
      })
    })
    it('sets status to done when completed is true', () => {
      expect(toAppTodo({ id: 2, todo: 'Done', completed: true, userId: 1 })).toEqual({
        id: 2,
        todo: 'Done',
        completed: true,
        userId: 1,
        status: 'done',
      })
    })
    it('preserves custom status when not completed', () => {
      expect(toAppTodo({ id: 3, todo: 'WIP', completed: false, userId: 1, status: 'on_progress' })).toEqual({
        id: 3,
        todo: 'WIP',
        completed: false,
        userId: 1,
        status: 'on_progress',
      })
    })
  })

  describe('STATUSES', () => {
    it('defines four column statuses', () => {
      expect(STATUSES).toEqual(['todo', 'on_progress', 'need_review', 'done'])
    })
  })

  describe('fetchTodos', () => {
    it('returns todos and total from API', async () => {
      const mockRes = { todos: [{ id: 1, todo: 'A', completed: false, userId: 1 }], total: 1 }
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(mockRes) })
      const result = await fetchTodos(10, 0)
      expect(result.todos).toHaveLength(1)
      expect(result.todos[0]).toMatchObject({ id: 1, todo: 'A', status: 'todo' })
      expect(result.total).toBe(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('limit=10'))
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('skip=0'))
    })
    it('throws when response is not ok', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false })
      await expect(fetchTodos()).rejects.toThrow('Failed to fetch todos')
    })
  })

  describe('addTodo', () => {
    it('POSTs and returns created todo', async () => {
      const created = { id: 151, todo: 'New', completed: false, userId: 5 }
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(created) })
      const result = await addTodo({ todo: 'New', completed: false, userId: 5 })
      expect(result).toMatchObject({ id: 151, todo: 'New' })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/add'),
        expect.objectContaining({ method: 'POST', body: expect.any(String) })
      )
    })
  })

  describe('updateTodo', () => {
    it('PATCHes and returns updated todo', async () => {
      const updated = { id: 1, todo: 'Updated', completed: true, userId: 1 }
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(updated) })
      const result = await updateTodo(1, { completed: true })
      expect(result).toMatchObject(updated)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/todos\/1$/),
        expect.objectContaining({ method: 'PATCH' })
      )
    })
  })

  describe('deleteTodo', () => {
    it('DELETE and returns', async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 1 }) })
      await deleteTodo(1)
      expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/todos\/1$/), { method: 'DELETE' })
    })
  })
})
