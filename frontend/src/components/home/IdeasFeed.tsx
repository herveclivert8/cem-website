import { useTranslation } from 'react-i18next'

import { useIdeas } from '../../api/hooks'
import type { User } from '../../api/types'

function Avatar({ user }: { user: User }) {
  if (user.avatar_url) {
    return <img src={user.avatar_url} alt={user.full_name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
  }
  const initials = user.full_name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
      {initials}
    </div>
  )
}

export function IdeasFeed() {
  const { t } = useTranslation()
  const { data: ideas, isLoading } = useIdeas()

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">{t('sections.ideasMixer')}</h2>

      {isLoading && <p className="text-sm text-gray-400">{t('common.loading')}</p>}

      <ul className="space-y-3">
        {ideas?.map((idea) => (
          <li key={idea.id} className="flex items-start gap-3">
            <Avatar user={idea.author} />
            <div>
              <p className="text-sm font-semibold text-gray-900">{idea.author.full_name}</p>
              <p className="text-sm text-gray-600">{idea.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
