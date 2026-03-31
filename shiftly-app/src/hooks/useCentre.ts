'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

interface UpdateCentrePayload {
  nom?:       string
  adresse?:   string | null
  telephone?: string | null
  siteWeb?:   string | null
}

interface CentreResponse {
  id:        number
  nom:       string
  adresse:   string | null
  telephone: string | null
  siteWeb:   string | null
}

/**
 * Mutation pour mettre à jour les infos du centre.
 * Invalide le cache /me pour rafraîchir les données partout.
 */
export function useUpdateCentre() {
  const centreId    = useAuthStore(s => s.centreId)
  const queryClient = useQueryClient()

  return useMutation<CentreResponse, Error, UpdateCentrePayload>({
    mutationFn: async (payload) => {
      const { data } = await api.patch<CentreResponse>(
        `/centres/${centreId}/update`,
        payload,
      )
      return data
    },
    onSuccess: () => {
      // Rafraîchir les données utilisateur (inclut le centre)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}
