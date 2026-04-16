'use client'

import type { PlanningStats, PlanningZone } from '@/types/planning'

interface StatsBarProps {
  stats:          PlanningStats
  zones:          PlanningZone[]
  alertCount:     number
  showAlerts:     boolean
  onToggleAlerts: () => void
}

/** Barre de métriques — chiffres clés + légende zones + bouton alertes */
export default function StatsBar({ stats, zones, alertCount, showAlerts, onToggleAlerts }: StatsBarProps) {
  const creneauxColor = stats.creneauxVides > 0 ? 'var(--red)'    : undefined
  const sousPlanColor = stats.sousPlanifies  > 0 ? 'var(--yellow)' : undefined

  return (
    <div className="flex items-center gap-6 border-t border-[var(--border)] bg-[var(--surface)] px-6 py-3.5">

      {/* Métriques */}
      <div className="flex items-center gap-6">
        <StatItem dot="var(--green)" label="Employés planifiés" value={`${stats.employesPlanifies}`} />
        <Sep />
        <StatItem dot="var(--blue)" label="Total heures" value={`${stats.totalHeures}h`} color="var(--accent)" />
        <Sep />
        <StatItem dot="var(--red)" label="Dépassements" value={`${stats.creneauxVides}`} color={creneauxColor} />
        <Sep />
        <StatItem dot="var(--yellow)" label="Sous-planifiés" value={`${stats.sousPlanifies}`} color={sousPlanColor} />
      </div>

      {/* Légende zones */}
      {zones.length > 0 && (
        <div className="ml-auto flex items-center gap-4">
          {zones.map(z => (
            <div key={z.id} className="flex items-center gap-1.5 text-[12px] text-[var(--muted)]">
              <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: z.couleur }} />
              {z.nom}
            </div>
          ))}
        </div>
      )}

      {/* Alertes */}
      <button
        onClick={onToggleAlerts}
        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
          showAlerts
            ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
            : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
        }`}
      >
        {alertCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--red)] text-[10px] font-bold text-white">
            {alertCount > 9 ? '9+' : alertCount}
          </span>
        )}
        Alertes
        <span className="opacity-60">{showAlerts ? '▲' : '▼'}</span>
      </button>
    </div>
  )
}

function Sep() {
  return <div className="h-6 w-px bg-[var(--border)]" />
}

function StatItem({ dot, label, value, color }: { dot: string; label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      <span className="text-[12px] text-[var(--muted)]">{label}</span>
      <span className="text-[14px] font-bold" style={{ color: color ?? 'var(--text)' }}>{value}</span>
    </div>
  )
}
