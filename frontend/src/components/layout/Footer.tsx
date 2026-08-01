import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex gap-4">
          <a href="/a-propos" className="hover:text-brand-600">
            {t('footer.about')}
          </a>
          <a href="/contact" className="hover:text-brand-600">
            {t('footer.contact')}
          </a>
          <a href="/mentions-legales" className="hover:text-brand-600">
            {t('footer.legal')}
          </a>
        </div>
        <p>{t('footer.copyright', { year })}</p>
      </div>
    </footer>
  )
}
