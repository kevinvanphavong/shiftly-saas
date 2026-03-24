'use client'

import { useState } from 'react'
import { cn }       from '@/lib/cn'

interface ReadIndicatorProps {
  tutoId:    number
  initialRead: boolean
  onToggle?: (tutoId: number, isRead: boolean) => void
}

/**
 * Bouton "marquer comme lu" — cercle muted → cercle vert.
 * Appel POST /api/tuto-reads à l'activation.
 * Clic sur lu → démarquer (DELETE).
 */
export default function ReadIndicator({ tutoId, initialRead, onToggle }: ReadIndicatorProps) {
  const [isRead,   setIsRead]   = useState(initialRead)
  const [loading,  setLoading]  = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()  // Ne pas déclencher le toggle de la card
    if (loading) return

    setLoading(true)
    const next = !isRead
    setIsRead(next)  // Optimistic

    try {
      // TODO: swap mock → real API
      await new Promise(r => setTimeout(r, 200))
      // if (next) {
      //   await api.post('/tuto_reads', { tutoriel: `/api/tutoriels/${tutoId}`, user: '/api/users/1' })
      // } else {
      //   await api.delete(`/tuto_reads/${readId}`)
      // }
      onToggle?.(tutoId, next)
    } catch {
      setIsRead(!next)  // Rollback
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title={isRead ? 'Marquer comme non lu' : 'Marquer comme lu'}
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
        'transition-all duration-300 border',
        loading && 'opacity-50 cursor-wait',
        isRead
          ? 'bg-green/15 border-green/30 text-green'
          : 'bg-surface2 border-border text-muted hover:border-muted hover:text-text'
      )}
    >
      {isRead ? (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </button>
  )
}
