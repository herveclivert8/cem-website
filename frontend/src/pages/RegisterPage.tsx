import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Button } from '../components/ui/Button'
import { useAuth } from '../features/auth/AuthContext'

export function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register, googleLoginUrl } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await register(email, password, fullName)
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setError(t('auth.errors.emailTaken'))
      } else {
        setError(t('auth.errors.generic'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-2xl font-bold text-gray-900">{t('auth.register.title')}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          {t('auth.fields.fullName')}
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>

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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {t('auth.register.submit')}
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
          {t('auth.login.google')}
        </a>

        <p className="text-center text-sm text-gray-500">
          {t('auth.register.hasAccount')}{' '}
          <Link to="/connexion" className="font-semibold text-brand-700 hover:underline">
            {t('auth.register.loginLink')}
          </Link>
        </p>
      </form>
    </div>
  )
}
