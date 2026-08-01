import { useTranslation } from 'react-i18next'

export function StubPage({ titleKey }: { titleKey: 'nav.projects' | 'nav.resources' | 'nav.events' }) {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-gray-900">{t(titleKey)}</h1>
      <p className="mt-3 text-gray-500">{t('stub.comingSoon')}</p>
    </div>
  )
}
