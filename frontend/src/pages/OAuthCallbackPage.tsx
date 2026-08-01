import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAuth } from '../features/auth/AuthContext'

export function OAuthCallbackPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { loginWithToken } = useAuth()

  useEffect(() => {
    const token = searchParams.get('access_token')
    if (!token) {
      navigate('/connexion?error=oauth_failed')
      return
    }
    loginWithToken(token)
      .then(() => navigate('/'))
      .catch(() => navigate('/connexion?error=oauth_failed'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p className="px-4 py-16 text-center text-gray-500">{t('common.loading')}</p>
}
