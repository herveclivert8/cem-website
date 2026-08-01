import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { AuthProvider } from './features/auth/AuthContext'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { OAuthCallbackPage } from './pages/OAuthCallbackPage'
import { RegisterPage } from './pages/RegisterPage'
import { StubPage } from './pages/StubPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex min-h-svh flex-col bg-gray-50">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/connexion" element={<LoginPage />} />
                <Route path="/inscription" element={<RegisterPage />} />
                <Route path="/oauth/callback" element={<OAuthCallbackPage />} />
                <Route path="/projets" element={<StubPage titleKey="nav.projects" />} />
                <Route path="/ressources" element={<StubPage titleKey="nav.resources" />} />
                <Route path="/evenements" element={<StubPage titleKey="nav.events" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
