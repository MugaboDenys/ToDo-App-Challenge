import { useTranslation } from 'react-i18next'
import { useApp } from '../contexts/AppContext'
import type { ReactNode } from 'react'

const iconSearch = (
  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
)
const iconInbox = (
  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
)
const iconCalendar = (
  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
)
const iconSettings = (
  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
)
const iconGrid = (
  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
)

interface NavItemProps {
  icon: ReactNode
  label: string
  badge?: string
}

function NavItem({ icon, label, badge }: NavItemProps) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-app-text)] transition-colors hover:bg-[var(--color-app-border)]/50"
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge != null && <span className="rounded bg-[var(--color-primary)] px-1.5 py-0.5 text-xs text-white">{badge}</span>}
    </a>
  )
}

export default function Sidebar() {
  const { t } = useTranslation()
  const { theme, toggleTheme, locale, setLocale } = useApp()

  return (
    <aside className="sidebar fixed left-0 top-0 z-30 flex h-full w-56 flex-col border-r border-[var(--color-app-border)] bg-[var(--color-app-surface)] py-4 shadow-[var(--shadow-sidebar)] sm:w-56 lg:w-64">
      <div className="flex items-center gap-2 px-4">
        <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">{iconGrid}</div>
        <span className="text-lg font-semibold text-[var(--color-app-text)]">{t('appName')}</span>
      </div>
      <nav className="mt-6 flex flex-1 flex-col gap-0.5 px-2">
        <NavItem icon={iconSearch} label={t('sidebar.search')} />
        <NavItem icon={iconInbox} label={t('sidebar.inbox')} badge={t('common.new')} />
        <NavItem icon={iconCalendar} label={t('sidebar.calendar')} />
        <NavItem icon={iconSettings} label={t('sidebar.settings')} />
      </nav>
      <div className="mt-4 space-y-2 px-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--color-app-muted)] transition-colors hover:bg-[var(--color-app-border)]/50 hover:text-[var(--color-app-text)]"
        >
          {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLocale('en')}
            className={`rounded px-2 py-1 text-xs ${locale === 'en' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-app-muted)] hover:bg-[var(--color-app-border)]/50'}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLocale('fr')}
            className={`rounded px-2 py-1 text-xs ${locale === 'fr' ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-app-muted)] hover:bg-[var(--color-app-border)]/50'}`}
          >
            FR
          </button>
        </div>
      </div>
      <div className="mx-2 mt-2 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-indigo-600 p-4 text-white">
        <p className="font-medium">{t('sidebar.upgradeTitle')}</p>
        <p className="mt-1 text-sm opacity-90">{t('sidebar.upgradeSubtitle')}</p>
        <button type="button" className="mt-3 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium backdrop-blur hover:bg-white/30">
          {t('sidebar.upgrade')}
        </button>
      </div>
    </aside>
  )
}
