'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

export interface CurrentUser {
  id: number
  nom: string
  email: string
  role: 'MANAGER' | 'EMPLOYE'
  avatarColor: string | null
  points: number
  centre: {
    id: number
    nom: string
  } | null
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }

    api
      .get('/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  return { user, loading }
}
