import { useTranslation } from 'react-i18next'

interface HeroSearchProps {
  value: string
  onChange: (value: string) => void
}

export function HeroSearch({ value, onChange }: HeroSearchProps) {
  const { t } = useTranslation()

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{t('hero.title')}</h1>
      <p className="mt-2 text-gray-500 italic">{t('hero.subtitle')}</p>

      <div className="relative mt-8">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('hero.searchPlaceholder')}
          className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-base shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>
    </section>
  )
}
