import { useTranslation } from 'react-i18next'
import { useApp } from '../contexts/AppContext'
import type { ReactNode } from 'react'
import { CiCalendarDate, CiSearch, CiMail } from 'react-icons/ci'
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";



const iconSearch = <CiSearch className="size-5" />
const iconInbox = <CiMail className="size-5" />
const iconCalendar = <CiCalendarDate className="size-5" />
const iconSettings = <IoSettingsOutline className="size-5" />
const iconGrid = <MdOutlineAutoAwesomeMotion className="size-5" />


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
  const { locale, setLocale } = useApp()

  return (
    <aside className="sidebar fixed left-0 top-0 z-30 flex h-full w-[var(--sidebar-width)] flex-col border-r border-[var(--color-app-border)] bg-[var(--color-app-surface)] py-4 shadow-[var(--shadow-sidebar)]">
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
