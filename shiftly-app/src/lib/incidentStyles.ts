/**
 * incidentStyles.ts — Constantes de style partagées pour les modals incident.
 *
 * Utilisation : import { inc } from '@/lib/incidentStyles'
 * Exemple     : <span className={inc.sevBadge[severite]}>...</span>
 *
 * Centralise tous les mappings label/couleur utilisés dans :
 *   - ModalIncidentDetail
 *   - ModalIncidentEdit
 *   - IncidentsList (page réglages incidents)
 */
import type { IncidentSeverite } from '@/types/service'

// ─── Sévérité ─────────────────────────────────────────────────────────────────

export const inc = {

  /** Point coloré inline (w-2 h-2 rounded-full) */
  sevDot: {
    haute:   'bg-red',
    moyenne: 'bg-yellow',
    basse:   'bg-muted',
  } as Record<string, string>,

  /** Badge sévérité (texte + fond) sans bordure */
  sevBadge: {
    haute:   'text-red    bg-red/10',
    moyenne: 'text-yellow bg-yellow/10',
    basse:   'text-muted  bg-surface2',
  } as Record<string, string>,

  /** Badge sévérité avec bordure (ex. : modale détail) */
  sevBadgeBorder: {
    haute:   'text-red    bg-red/10    border-red/20',
    moyenne: 'text-yellow bg-yellow/10 border-yellow/20',
    basse:   'text-muted  bg-surface2  border-border',
  } as Record<string, string>,

  /** Label humain de la sévérité */
  sevLabel: {
    haute:   'Haute',
    moyenne: 'Moyenne',
    basse:   'Basse',
  } as Record<string, string>,

  // ─── Statut ─────────────────────────────────────────────────────────────────

  /** Badge statut (texte + fond) */
  statutBadge: {
    OUVERT:   'text-red    bg-red/10',
    EN_COURS: 'text-yellow bg-yellow/10',
    RESOLU:   'text-green  bg-green/10',
  } as Record<string, string>,

  /** Label humain du statut */
  statutLabel: {
    OUVERT:   'Ouvert',
    EN_COURS: 'En cours',
    RESOLU:   'Résolu',
  } as Record<string, string>,

  // ─── Chips sévérité (formulaire) ─────────────────────────────────────────────

  /** Config des chips sévérité pour les formulaires */
  severiteOptions: [
    { value: 'haute'   as IncidentSeverite, label: '🔴 Haute',   activeCls: 'border-red    bg-red/10    text-red'   },
    { value: 'moyenne' as IncidentSeverite, label: '🟡 Moyenne', activeCls: 'border-yellow bg-yellow/10 text-yellow' },
    { value: 'basse'   as IncidentSeverite, label: '⚪ Basse',   activeCls: 'border-muted  bg-surface2  text-text'  },
  ],

  /** Config des chips statut pour les formulaires */
  statutOptions: [
    { value: 'OUVERT'   as const, label: 'Ouvert',   activeCls: 'border-red    bg-red/10    text-red'   },
    { value: 'EN_COURS' as const, label: 'En cours', activeCls: 'border-yellow bg-yellow/10 text-yellow' },
    { value: 'RESOLU'   as const, label: 'Résolu',   activeCls: 'border-green  bg-green/10  text-green'  },
  ],

  // ─── Styles des éléments UI partagés ─────────────────────────────────────────

  /** Label de section dans la modal (au-dessus des champs) */
  fieldLabel:    'block text-[11px] font-bold text-muted uppercase tracking-wider mb-2',

  /** Badge générique dans les modals (taille, graisse) */
  badge:         'text-[10px] font-extrabold font-syne uppercase tracking-wider px-2 py-1 rounded-[6px]',

  /** Chip de sélection (sévérité, statut, zone) — état inactif */
  chipInactive:  'border-border text-muted hover:border-border/80',

  /** Textarea d'un formulaire modal */
  textarea:      'w-full bg-surface2 border rounded-[12px] px-3.5 py-3 text-[13px] text-text placeholder:text-muted resize-none outline-none transition-colors',

  /** Bouton annuler / secondaire dans le footer */
  btnCancel:     'flex-1 py-3 rounded-[12px] bg-surface2 border border-border text-[13px] font-bold text-muted hover:text-text transition-colors',

  /** Bouton primary (enregistrer, fermer) dans le footer */
  btnPrimary:    'flex-1 py-3 rounded-[12px] bg-accent text-[13px] font-extrabold text-white hover:opacity-90 transition-opacity',

  /** Bouton primary dégradé (submit de formulaire) */
  btnSubmit:     'flex-[2] py-3 rounded-[12px] text-[13px] font-extrabold text-white bg-gradient-to-r from-accent to-accent/80 disabled:opacity-40 disabled:cursor-not-allowed',

  /** Avatar carré */
  avatar:        'w-7 h-7 rounded-[7px] flex items-center justify-center text-white font-extrabold text-[10px] flex-shrink-0',

} as const
