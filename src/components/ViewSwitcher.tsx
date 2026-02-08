import { useTranslation } from 'react-i18next'
import type { ViewMode } from '../types'
import { PiKanbanLight } from "react-icons/pi";
import { IoIosList } from "react-icons/io";



type Props = { view: ViewMode; setView: (view: ViewMode) => void }

const iconKanban = <PiKanbanLight className="size-4" />
const iconList = <IoIosList className="size-4" />

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
