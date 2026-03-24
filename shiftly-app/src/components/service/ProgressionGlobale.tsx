import { cn } from '@/lib/cn'

interface ZoneStat {
  nom:      string
  couleur:  string
  done:     number
  total:    number
}

interface ProgressionGlobaleProps {
  stats:      ZoneStat[]
  totalDone:  number
  totalAll:   number
  className?: string
}

export default function ProgressionGlobale({
  stats,
  totalDone,
  totalAll,
  className,
}: ProgressionGlobaleProps) {
  const globalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0

  return (
    <div className={cn('bg-surface border border-border rounded-[18px] p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-syne font-extrabold text-[13px] text-text uppercase tracking-wide">
          Progression globale
        </h3>
        <span className="font-syne font-extrabold text-[20px] text-accent leading-none">
          {globalPct}%
        </span>
      </div>

      {/* Main bar */}
      <div className="h-2 bg-surface2 rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-700"
          style={{ width: `${globalPct}%` }}
        />
      </div>

      {/* Zone breakdown */}
      <div className="flex flex-col gap-2.5">
        {stats.map(z => {
          const pct = z.total > 0 ? Math.round((z.done / z.total) * 100) : 0
          return (
            <div key={z.nom} className="flex items-center gap-3">
              {/* Zone dot + name */}
              <div className="flex items-center gap-1.5 w-[80px] flex-shrink-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: z.couleur }}
                />
                <span
                  className="text-[11px] font-bold truncate"
                  style={{ color: z.couleur }}
                >
                  {z.nom}
                </span>
              </div>

              {/* Bar */}
              <div className="flex-1 h-[5px] bg-surface2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: z.couleur }}
                />
              </div>

              {/* Pct + count */}
              <div className="flex items-center gap-2 flex-shrink-0 min-w-[60px] justify-end">
                <span className="text-[11px] font-extrabold font-syne" style={{ color: z.couleur }}>
                  {pct}%
                </span>
                <span className="text-[10px] text-muted">
                  {z.done}/{z.total}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer count */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <span className="text-[11px] text-muted">Missions complétées</span>
        <span className="text-[13px] font-extrabold font-syne text-text">
          {totalDone}
          <span className="text-muted font-normal">/{totalAll}</span>
        </span>
      </div>
    </div>
  )
}
