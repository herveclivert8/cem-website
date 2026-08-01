import { useTranslation } from 'react-i18next'

import type { Project } from '../../api/types'
import { formatRelativeDays } from '../../lib/relativeTime'

export function ProjectCard({ project }: { project: Project }) {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language.startsWith('en')
  const title = isEn && project.title_en ? project.title_en : project.title
  const description = isEn && project.description_en ? project.description_en : project.description

  return (
    <article className="flex w-72 shrink-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {project.image_url && (
        <img src={project.image_url} alt={title} className="h-36 w-full object-cover" loading="lazy" />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="line-clamp-3 flex-1 text-sm text-gray-600">{description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag.id} className="rounded bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
              {tag.name}
            </span>
          ))}
          {project.zone_geo && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {project.zone_geo}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM3 17a7 7 0 0114 0H3z" />
            </svg>
            {t('card.contributors')}: {project.contributors_count}
          </span>
          <span>
            {t('card.updated')}: {formatRelativeDays(project.updated_at, i18n.language)}
          </span>
        </div>
      </div>
    </article>
  )
}
