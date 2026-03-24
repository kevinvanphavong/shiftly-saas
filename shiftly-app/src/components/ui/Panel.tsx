import { cn } from '@/lib/cn'

interface PanelProps {
  title: string
  action?: { label: string; onClick?: () => void }
  children: React.ReactNode
  className?: string
}

export default function Panel({ title, action, children, className }: PanelProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-[18px] p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-syne font-extrabold text-[13px] text-text uppercase tracking-wide">
          {title}
        </h3>
        {action && (
          <button
            onClick={action.onClick}
            className="text-[11px] text-accent font-semibold hover:opacity-80 transition-opacity"
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  )
}
