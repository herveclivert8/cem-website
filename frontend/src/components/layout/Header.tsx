import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { LanguageSelector } from '../ui/LanguageSelector'
import { useAuth } from '../../features/auth/AuthContext'

const NAV_LINKS: { key: 'home' | 'projects' | 'resources' | 'events'; to: string }[] = [
  { key: 'home', to: '/' },
  { key: 'projects', to: '/projets' },
  { key: 'resources', to: '/ressources' },
  { key: 'events', to: '/evenements' },
]

export function Header() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <LanguageSelector />

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className="hidden text-sm font-medium text-gray-700 hover:text-brand-600 sm:inline"
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}

          {user ? (
            <button
              type="button"
              onClick={() => logout()}
              className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              {t('nav.logout')}
            </button>
          ) : (
            <Link
              to="/connexion"
              className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              {t('nav.login')}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
