import { useTranslation } from 'react-i18next'

import type { Publication } from '../../api/types'
import { formatRelativeDays } from '../../lib/relativeTime'

const FORMAT_COLORS: Record<Publication['format'], string> = {
  pdf: 'bg-orange-100 text-orange-700',
  rapport: 'bg-emerald-100 text-emerald-700',
}

export function PublicationCard({ publication }: { publication: Publication }) {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language.startsWith('en')
  const title = isEn && publication.title_en ? publication.title_en : publication.title

  return (
    <article className="flex w-64 shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {publication.thumbnail_url && (
        <img src={publication.thumbnail_url} alt={title} className="h-32 w-full object-cover" loading="lazy" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className={`w-fit rounded px-2 py-0.5 text-xs font-semibold uppercase ${FORMAT_COLORS[publication.format]}`}>
          {publication.format}
        </span>
        <h3 className="line-clamp-2 font-bold text-gray-900">{title}</h3>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500">
          <span>
            {t('card.contributors')}: {publication.contributors_count}
          </span>
          <span>{formatRelativeDays(publication.updated_at, i18n.language)}</span>
        </div>
      </div>
    </article>
  )
}
