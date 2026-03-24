interface ProgressBannerProps {
  readCount: number
  total:     number
}

/**
 * Bannière de progression — conic-gradient calculé dynamiquement.
 * Affiche un anneau de progression + stats texte.
 */
export default function ProgressBanner({ readCount, total }: ProgressBannerProps) {
  const pct     = total > 0 ? Math.round((readCount / total) * 100) : 0
  const allDone = readCount === total && total > 0

  // conic-gradient: 0%→pct orange, reste surface2
  const conicBg = `conic-gradient(
    #f97316 0% ${pct}%,
    #1c2030 ${pct}% 100%
  )`

  return (
    <div className="bg-surface border border-border rounded-[18px] p-4 flex items-center gap-4">
      {/* ── Conic ring ── */}
      <div className="relative flex-shrink-0 w-[72px] h-[72px]">
        {/* Outer ring via conic-gradient */}
        <div
          className="w-full h-full rounded-full"
          style={{ background: conicBg }}
        />
        {/* Inner mask → donut */}
        <div className="absolute inset-[10px] rounded-full bg-surface flex items-center justify-center">
          <div className="text-center">
            <span className="font-syne font-extrabold text-[13px] text-accent leading-none block">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Text ── */}
      <div className="flex-1 min-w-0">
        <div className="font-syne font-extrabold text-[15px] text-text leading-tight">
          {allDone ? '🎉 Tout lu !' : 'Ma progression'}
        </div>
        <div className="text-[12px] text-muted mt-0.5">
          {readCount} sur {total} tutoriel{total > 1 ? 's' : ''} lu{readCount > 1 ? 's' : ''}
        </div>

        {/* Mini progress bar */}
        <div className="mt-2 h-[4px] bg-surface2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: allDone
                ? '#22c55e'
                : 'linear-gradient(90deg, #f97316, #fb923c)',
            }}
          />
        </div>
      </div>

      {/* ── Right stat ── */}
      <div className="text-right flex-shrink-0">
        <div className="font-syne font-extrabold text-[22px] text-text leading-none">
          {total - readCount}
        </div>
        <div className="text-[10px] text-muted mt-0.5">à lire</div>
      </div>
    </div>
  )
}
