import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../components/ui/Button'
import { useAuth } from '../features/auth/AuthContext'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, googleLoginUrl } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError(t('auth.errors.invalidCredentials'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-2xl font-bold text-gray-900">{t('auth.login.title')}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          {t('auth.fields.email')}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          {t('auth.fields.password')}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {t('auth.login.submit')}
        </Button>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          OU
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <a
          href={googleLoginUrl}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.2 2.7-2.5 3.6v3h4C22.3 19 23.5 16 23.5 12.3z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4-3c-1.1.7-2.4 1.2-3.9 1.2-3 0-5.6-2-6.5-4.8h-4v3.1C3.5 21.5 7.4 24 12 24z"
            />
            <path fill="#FBBC05" d="M5.5 14.5c-.2-.7-.4-1.4-.4-2.5s.1-1.7.4-2.5V6.4h-4C.5 8.1 0 10 0 12s.5 3.9 1.5 5.6l4-3.1z" />
            <path
              fill="#EA4335"
              d="M12 4.7c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.5 2.5 1.5 6.4l4 3.1c.9-2.8 3.5-4.8 6.5-4.8z"
            />
          </svg>
          {t('auth.login.google')}
        </a>

        <p className="text-center text-sm text-gray-500">
          {t('auth.login.noAccount')}{' '}
          <Link to="/inscription" className="font-semibold text-brand-700 hover:underline">
            {t('auth.login.registerLink')}
          </Link>
        </p>
      </form>
    </div>
  )
}
