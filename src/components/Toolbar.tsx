import { useTranslation } from 'react-i18next'
import type { SortOption } from '../types'

type Props = {
  search: string
  setSearch: (value: string) => void
  sort: SortOption
  setSort: (value: SortOption) => void
}

const iconSearch = (
  <svg className="size-5 text-[var(--color-app-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
)
const iconFilter = (
  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
)

export default function Toolbar({ search, setSearch, sort, setSort }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <div className="flex flex-1 min-w-[200px] items-center gap-2 rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface)] px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30">
        {iconSearch}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('toolbar.searchPlaceholder')}
          className="flex-1 border-0 bg-transparent text-sm text-[var(--color-app-text)] placeholder:text-[var(--color-app-muted)] focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <button type="button" className="flex items-center gap-2 rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface)] px-3 py-2 text-sm text-[var(--color-app-text)] transition-colors hover:bg-[var(--color-app-border)]/30">
          {iconFilter}
          {t('toolbar.filter')}
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface)] px-3 py-2 text-sm text-[var(--color-app-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
        >
          <option value="default">{t('toolbar.sort')}</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  )
}
