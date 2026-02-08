import { useTranslation } from 'react-i18next'
import type { ViewMode } from '../types'

type Props = { view: ViewMode; setView: (view: ViewMode) => void }

const iconKanban = (
  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
)
const iconList = (
  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
)

export default function ViewSwitcher({ view, setView }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-bg)] p-0.5">
      <button
        type="button"
        onClick={() => setView('kanban')}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          view === 'kanban'
            ? 'bg-[var(--color-app-surface)] text-[var(--color-primary)] shadow-[var(--shadow-card)]'
            : 'text-[var(--color-app-muted)] hover:text-[var(--color-app-text)]'
        }`}
      >
        {iconKanban}
        {t('views.kanban')}
      </button>
      <button
        type="button"
        onClick={() => setView('list')}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          view === 'list'
            ? 'bg-[var(--color-app-surface)] text-[var(--color-primary)] shadow-[var(--shadow-card)]'
            : 'text-[var(--color-app-muted)] hover:text-[var(--color-app-text)]'
        }`}
      >
        {iconList}
        {t('views.list')}
      </button>
    </div>
  )
}
