import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjects, usePublications, useSearch } from '../api/hooks'
import { CallsBlock } from '../components/home/CallsBlock'
import { CardRow } from '../components/home/CardRow'
import { HeroSearch } from '../components/home/HeroSearch'
import { IdeasFeed } from '../components/home/IdeasFeed'
import { ProjectCard } from '../components/home/ProjectCard'
import { PublicationCard } from '../components/home/PublicationCard'

export function HomePage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const { data: projects, isLoading: projectsLoading } = useProjects()
  const { data: publications, isLoading: publicationsLoading } = usePublications()
  const { data: searchResults, isLoading: searchLoading } = useSearch(query)

  const isSearching = query.trim().length > 0

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <HeroSearch value={query} onChange={setQuery} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {isSearching ? (
            <>
              {searchLoading && <p className="py-6 text-sm text-gray-400">{t('common.loading')}</p>}
              {searchResults && (
                <>
                  <CardRow title={t('sections.recentProjects')}>
                    {searchResults.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </CardRow>
                  <CardRow title={t('sections.publications')}>
                    {searchResults.publications.map((publication) => (
                      <PublicationCard key={publication.id} publication={publication} />
                    ))}
                  </CardRow>
                </>
              )}
            </>
          ) : (
            <>
              {projectsLoading && <p className="py-6 text-sm text-gray-400">{t('common.loading')}</p>}
              {projects && (
                <CardRow title={t('sections.recentProjects')}>
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </CardRow>
              )}

              {publicationsLoading && <p className="py-6 text-sm text-gray-400">{t('common.loading')}</p>}
              {publications && (
                <CardRow title={t('sections.publications')}>
                  {publications.map((publication) => (
                    <PublicationCard key={publication.id} publication={publication} />
                  ))}
                </CardRow>
              )}
            </>
          )}
        </div>

        <aside className="space-y-6 py-6">
          <CallsBlock />
          <IdeasFeed />
        </aside>
      </div>
    </div>
  )
}
