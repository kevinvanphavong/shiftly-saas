import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

// ─── Variants CVA ─────────────────────────────────────────────────────────────
const dot = cva(
  'rounded-full transition-all flex-shrink-0',
  {
    variants: {
      size: {
        sm: 'w-[6px] h-[6px]',
        md: 'w-2     h-2',
      },
      active: {
        true:  'bg-accent',
        false: 'bg-surface2 border border-border',
      },
    },
    defaultVariants: {
      size:   'sm',
      active: false,
    },
  }
)

// ─── Props ────────────────────────────────────────────────────────────────────
interface LevelDotsProps extends VariantProps<typeof dot> {
  niveau:     number    // 1–5
  max?:       number    // default 5
  size?:      'sm' | 'md'
  className?: string
}

/** Visualise le niveau avec des dots colorés ●●●○○ */
export default function LevelDots({
  niveau,
  max = 5,
  size = 'sm',
  className,
}: LevelDotsProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={dot({ size, active: i < niveau })}
        />
      ))}
    </div>
  )
}
