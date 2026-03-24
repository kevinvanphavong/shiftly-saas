'use client'

const SWATCHES = [
  '#3b82f6',
  '#a855f7',
  '#22c55e',
  '#f59e0b',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
  '#f97316',
]

interface Props {
  value: string
  onChange: (color: string) => void
}

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {SWATCHES.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className="w-8 h-8 rounded-[10px] border-2 transition-all duration-150 flex-shrink-0"
          style={{
            background: color,
            borderColor: value === color ? 'white' : 'transparent',
            transform: value === color ? 'scale(1.1)' : 'scale(1)',
          }}
          aria-label={color}
        />
      ))}
    </div>
  )
}
