/**
 * animations.ts — Presets Framer Motion réutilisables.
 *
 * Centralise toutes les animations de l'app pour garantir la cohérence.
 * Usage :
 *   import { listVariants, listItemVariants } from '@/lib/animations'
 *
 * Règle d'accessibilité : utiliser <MotionConfig reducedMotion="user"> à la racine
 * pour respecter prefers-reduced-motion automatiquement.
 */

import type { Variants, Transition } from 'framer-motion'

// ─── Transitions réutilisables ────────────────────────────────────────────────

export const springDefault: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 300,
}

export const easeDefault: Transition = {
  duration: 0.2,
  ease: 'easeOut',
}

// ─── Listes staggerées ────────────────────────────────────────────────────────
// Appliqué sur le conteneur (motion.ul / motion.div).
// Les enfants utilisent listItemVariants.

export const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren:   0.02,
    },
  },
}

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   {
    opacity: 1,
    y: 0,
    transition: easeDefault,
  },
}

// ─── Bottom-sheet / modal ─────────────────────────────────────────────────────
// Remplace le pattern CSS translate-y-full / translate-y-0.
// Utiliser avec AnimatePresence pour animer l'entrée ET la sortie.

export const sheetVariants: Variants = {
  closed: { y: '100%' },
  open:   {
    y: 0,
    transition: springDefault,
  },
  exit: {
    y: '100%',
    transition: { ...easeDefault, duration: 0.25 },
  },
}

export const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open:   { opacity: 1, transition: easeDefault },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
}

// ─── Cartes dépliables ────────────────────────────────────────────────────────
// Utilisé dans MemberCard et TutoCard pour le contenu étendu.
// Nécessite overflow-hidden sur le parent.

export const expandVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

// ─── Apparition simple (fadeUp) ───────────────────────────────────────────────
// Remplace le keyframe CSS fadeUp défini dans tailwind.config.ts.

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: easeDefault },
}
