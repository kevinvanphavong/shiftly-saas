/**
 * userDisplay.ts — Utilitaires d'affichage des utilisateurs.
 *
 * Usage : import { getInitials, getDisplayName } from '@/lib/userDisplay'
 *
 * Règles :
 *  - Initiales : première lettre du prénom + première lettre du nom
 *    Ex. : Kevin Vong → "KV"  |  sans prénom → deux premières lettres du nom
 *  - Nom affiché : prénom seul (si disponible), sinon nom complet
 */

/**
 * Génère les initiales à afficher dans l'avatar.
 * Avec prénom : prenom[0] + nom[0]  → "KV"
 * Sans prénom : deux premières initiales du nom → "KV" depuis "Kevin Vong"
 */
export function getInitials(nom: string, prenom?: string | null): string {
  if (prenom) {
    const p = prenom.trim()[0] ?? ''
    const n = nom.trim()[0] ?? ''
    return (p + n).toUpperCase()
  }
  return nom
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Retourne le nom à afficher à côté de l'avatar.
 * Prénom seul si disponible, sinon nom complet.
 */
export function getDisplayName(nom: string, prenom?: string | null): string {
  return prenom?.trim() || nom
}
