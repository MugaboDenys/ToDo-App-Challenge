# ToDo — Task Manager
Deployed here 👉 **to-do-app-challenge-lac.vercel.app**


This is a single-page React task manager with **Kanban** and **List** views, dark theme, and English/French i18n. Data is loaded and synced with [DummyJSON Todos API](https://dummyjson.com/docs/todos).

## Features

- **Two views:** Kanban and List view
- **Dark / light theme** with persistence
- **i18n:** English and French
- **CRUD** via DummyJSON
- **Search** and **sort** (name, status)
- Responsive layout (sidebar + main content)

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

## Local setup

1. **Clone and install**

   ```bash
   cd todo
   npm install
   ```

2. **Run dev server**

   ```bash
   npm run dev
   ```

   Open the URL shown (e.g. `http://localhost:5173`).

3. **Build for production**

   ```bash
   npm run build
   ```

   Output is in `dist/`.

4. **Preview production build**

   ```bash
   npm run preview
   ```

## Tests

- **Run tests (watch):**

  ```bash
  npm run test
  ```

- **Run tests once (CI):**

  ```bash
  npm run test:run
  ```

- **Run tests with UI:**

  ```bash
  npm run test:ui
  ```

Covered areas:

- **API layer** (`src/api/todos.test.js`): `toAppTodo`, `STATUSES`, `fetchTodos`, `addTodo`, `updateTodo`, `deleteTodo`
- **ViewSwitcher** (`src/components/ViewSwitcher.test.jsx`): view buttons and `setView` calls
- **TaskCard** (`src/components/TaskCard.test.jsx`): renders task title and has correct test id

## Tech stack

- **TypeScript**
- React 19, Vite 7
- Tailwind CSS v4
- i18next + react-i18next (i18n)
- @hello-pangea/dnd (Kanban drag-and-drop)
- Vitest + React Testing Library (tests)

## Project structure

- `src/types.ts` — shared TypeScript types (Todo, ViewMode, Theme, etc.)
- `src/api/todos.ts` — DummyJSON client and task model
- `src/contexts/AppContext.tsx` — app state, theme, locale, CRUD
- `src/i18n/` — English and French translations
- `src/components/` — Sidebar, Header, ViewSwitcher, Toolbar, TaskCard, AddTaskForm (`.tsx`)
- `src/views/` — KanbanView, ListView (`.tsx`)
- `src/index.css` — Tailwind + theme variables (light/dark)
