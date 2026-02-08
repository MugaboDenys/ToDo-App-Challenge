import './App.css'
import { useApp, VIEW_KANBAN, VIEW_LIST } from './contexts/AppContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import KanbanView from './views/KanbanView'
import ListView from './views/ListView'

export default function App() {
  const { view } = useApp()

  return (
    <div className="app-shell flex h-screen w-full bg-[var(--color-app-bg)] text-[var(--color-app-text)]">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 pl-[var(--sidebar-width)]">
        <main className="flex flex-1 flex-col min-h-0">
          <Header />
          <div className="flex-1 overflow-auto">
            {view === VIEW_KANBAN && <KanbanView />}
            {view === VIEW_LIST && <ListView />}
          </div>
        </main>
      </div>
    </div>
  )
}
