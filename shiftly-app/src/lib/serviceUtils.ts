import { format } from 'date-fns'
import type { ServiceListItem } from '@/types/index'

/** Avant 5h du matin → on est encore dans le service de la veille */
const NIGHT_SHIFT_HOUR = 5

/**
 * Retourne la date effective du "jour actif" au format YYYY-MM-DD.
 * Entre 0h et 4h59 → date d'hier (service de nuit en cours).
 * À partir de 5h → date calendaire normale.
 */
export function getEffectiveToday(): string {
  const now = new Date()
  if (now.getHours() < NIGHT_SHIFT_HOUR) {
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    return format(yesterday, 'yyyy-MM-dd')
  }
  return format(now, 'yyyy-MM-dd')
}

/** Vérifie si une date de service (YYYY-MM-DD) correspond au jour actif */
export function isTodayService(date: string): boolean {
  return date === getEffectiveToday()
}

/** Extrait le service du jour depuis une liste de services */
export function findTodayService(services: ServiceListItem[]): ServiceListItem | undefined {
  return services.find(s => isTodayService(s.date))
}
