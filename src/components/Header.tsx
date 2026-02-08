import { useTranslation } from 'react-i18next'
import { useApp } from '../contexts/AppContext'
import ViewSwitcher from './ViewSwitcher'
import Toolbar from './Toolbar'
import { FiShare2 } from "react-icons/fi";


const iconShare = <FiShare2 className="size-5" />

export default function Header() {
  const { t } = useTranslation()
  const { view, setView, search, setSearch, sort, setSort, theme, toggleTheme } = useApp()

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-app-border)] bg-[var(--color-app-surface)]/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[var(--color-app-muted)]">
          <span>+</span>
          <span>{t('header.sharedPages')}</span>
          <span>/</span>
          <span className="text-[var(--color-app-text)]">{t('header.hrHub')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-lg p-2 text-[var(--color-app-muted)] transition-colors hover:bg-[var(--color-app-border)]/50 hover:text-[var(--color-app-text)]" aria-label="Share">
            {iconShare}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--color-app-muted)] transition-colors hover:bg-[var(--color-app-border)]/50 hover:text-[var(--color-app-text)]"
          >
            {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
      <div className="px-4 pb-3">
        <h1 className="text-2xl font-bold text-[var(--color-app-text)]">{t('header.hrHub')}</h1>
        <p className="text-sm text-[var(--color-app-muted)]">{t('header.welcome')}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <ViewSwitcher view={view} setView={setView} />
          <Toolbar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
        </div>
      </div>
    </header>
  )
}
