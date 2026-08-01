import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-red-500 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-red-50"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.label}</span>
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="absolute left-0 z-20 mt-1 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {LANGUAGES.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => {
                    i18n.changeLanguage(lang.code)
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-gray-50"
                >
                  <span aria-hidden>{lang.flag}</span>
                  {lang.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
