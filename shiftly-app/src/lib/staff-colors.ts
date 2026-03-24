/**
 * Gradient unique par userId — utilisé pour les avatars du staff.
 * Chaque gradient est défini une seule fois ici et importé partout.
 */

export const STAFF_GRADIENTS: Record<number, string> = {
  1:  'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',  // Kévin   — orange
  2:  'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',  // Patou   — blue
  3:  'linear-gradient(135deg, #a855f7 0%, #c084fc 100%)',  // Aya     — purple
  4:  'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)',  // Gabin   — green
  5:  'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)',  // Erwan   — teal
  6:  'linear-gradient(135deg, #f472b6 0%, #f9a8d4 100%)',  // Hiba    — pink
  7:  'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',  // Dina    — amber
  8:  'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',  // Cynthia — cyan
  9:  'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',  // Lucas   — indigo
  10: 'linear-gradient(135deg, #84cc16 0%, #a3e635 100%)',  // Théo    — lime
  11: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',  // Amina   — red
  12: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',  // Yanis   — violet
}

/** Retourne le gradient d'un userId (fallback = orange accent) */
export function getStaffGradient(userId: number): string {
  return STAFF_GRADIENTS[userId] ?? 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)'
}

/** Couleur "de base" extraite du gradient (premier stop) — pour les badges */
export const STAFF_COLORS: Record<number, string> = {
  1:  '#f97316',
  2:  '#3b82f6',
  3:  '#a855f7',
  4:  '#22c55e',
  5:  '#14b8a6',
  6:  '#f472b6',
  7:  '#f59e0b',
  8:  '#06b6d4',
  9:  '#6366f1',
  10: '#84cc16',
  11: '#ef4444',
  12: '#8b5cf6',
}

export function getStaffColor(userId: number): string {
  return STAFF_COLORS[userId] ?? '#f97316'
}
