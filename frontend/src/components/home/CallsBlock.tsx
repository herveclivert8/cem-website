import { useTranslation } from 'react-i18next'

import { useCalls } from '../../api/hooks'

export function CallsBlock() {
  const { t, i18n } = useTranslation()
  const { data: calls, isLoading } = useCalls()
  const isEn = i18n.language.startsWith('en')

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">
        {t('sections.callsForParticipation')}
      </h2>

      {isLoading && <p className="text-sm text-gray-400">{t('common.loading')}</p>}

      <ul className="divide-y divide-gray-100">
        {calls?.map((call) => (
          <li key={call.id} className="py-2.5 text-sm text-gray-600 first:pt-0 last:pb-0">
            {isEn && call.text_en ? call.text_en : call.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
