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

  // Removido: não deslogar automaticamente ao sair da área admin.

  const logout = async () => {
    await AuthService.logout()
    router.push('/admin')
  }

  return {
    isAuthenticated: AuthService.isAuthenticated(),
    logout
  }
}
