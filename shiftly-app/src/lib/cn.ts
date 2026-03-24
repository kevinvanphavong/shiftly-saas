/**
 * cn() — utilitaire de composition de classes Tailwind.
 *
 * Combine clsx (classes conditionnelles) et tailwind-merge (résolution de conflits).
 * Exemple : cn('px-2', condition && 'px-4') → 'px-4' (tailwind-merge résout le conflit).
 *
 * Usage :
 *   import { cn } from '@/lib/cn'
 *   className={cn('base-class', isActive && 'active-class', className)}
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
