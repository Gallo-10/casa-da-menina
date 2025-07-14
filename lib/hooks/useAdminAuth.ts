import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '../services/auth.service'

export function useAdminAuth() {
  const router = useRouter()

  // Verificar autenticação ao montar
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  // Logout automático ao sair da área admin
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Não fazer logout no refresh da página
      return
    }

    const handlePopState = () => {
      // Verificar se está saindo da área admin
      const currentPath = window.location.pathname
      if (!currentPath.startsWith('/admin')) {
        AuthService.logout()
      }
    }

    const handleRouteChange = (url: string) => {
      // Se está navegando para fora da área admin, fazer logout
      if (!url.startsWith('/admin')) {
        AuthService.logout()
      }
    }

    // Escutar mudanças de rota
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const logout = async () => {
    await AuthService.logout()
    router.push('/admin')
  }

  return {
    isAuthenticated: AuthService.isAuthenticated(),
    logout
  }
}
