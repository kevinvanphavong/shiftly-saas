'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/useCurrentUser'

/**
 * Redirige vers /reglages si l'utilisateur connecté n'est pas MANAGER.
 * Retourne { loading, isManager } pour que la page puisse bloquer son rendu.
 */
export function useManagerGuard() {
  const router = useRouter()
  const { user, loading } = useCurrentUser()

  useEffect(() => {
    if (!loading && user && user.role !== 'MANAGER') {
      router.replace('/reglages')
    }
  }, [user, loading, router])

  return {
    loading,
    isManager: !loading && !!user && user.role === 'MANAGER',
  }
}
