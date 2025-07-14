"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '../services/auth.service'

export function useAuthGuard(redirectTo: string = '/admin') {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Primeiro verificar localmente
        const localAuth = AuthService.isAuthenticated()

        if (!localAuth) {
          router.push(redirectTo)
          return
        }

        // Depois validar no backend
        const isValid = await AuthService.validateToken()

        if (!isValid) {
          router.push(redirectTo)
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error('❌ Erro na verificação de autenticação:', error)
        router.push(redirectTo)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, redirectTo])

  return { isAuthenticated, isLoading }
}
